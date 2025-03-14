import { Injectable, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as otpGenerator from 'otp-generator';

import { ErrorHelper } from 'src/core/helpers';
import { IUser } from 'src/core/interfaces';
import { SecretsService } from 'src/global/secrets/service';

@Injectable()
export class TokenHelper {
  private logger = new Logger(TokenHelper.name);
  constructor(private secretService: SecretsService) {}

  generate(payload: IUser): {
    accessToken: string;
    expires: number;
    refreshToken: string;
    sessionId: string;
  } {
    const { JWT_SECRET: secret } = this.secretService.jwtSecret;

    const sessionId = this.generateRandomString();

    const token = jwt.sign({ ...payload, sessionId }, secret, {
      expiresIn: '14d',
    });

    const refreshToken = jwt.sign(
      {
        userId: payload._id,
        userEmail: payload.email,
        isRefreshToken: true,
        sessionId,
      },
      secret,
      {
        expiresIn: '14d',
      },
    );

    const decoded = jwt.decode(token) as jwt.JwtPayload;
    return {
      accessToken: token,
      expires: decoded.exp,
      // expiresIn: decoded.iat,
      refreshToken,
      sessionId,
    };
  }

  verify<T>(token: string, opts?: jwt.VerifyOptions): T {
    try {
      const { JWT_SECRET: secret } = this.secretService.jwtSecret;

      const options: jwt.VerifyOptions = {
        ...opts,
        algorithms: ['HS256'],
      };
      const payload = jwt.verify(token, secret, options);
      return payload as T;
    } catch (error) {
      this.logger.log('err', error);
      if (error.name === 'TokenExpiredError')
        ErrorHelper.UnauthorizedException('Access token expired');
      if (error.name === 'JsonWebTokenError')
        ErrorHelper.UnauthorizedException('Access token not valid');
      throw error;
    }
  }

  generatePasswordResetToken(payload: any): string {
    const { JWT_SECRET: secret } = this.secretService.jwtSecret;

    return jwt.sign(
      {
        userId: payload._id,
        userEmail: payload.email,
        isPasswordResetToken: true,
      },
      secret,
      {
        expiresIn: '1h',
      },
    );
  }

  generateRandomString(size = 21): string {
    return otpGenerator.generate(size, {
      digits: true,
      lowerCaseAlphabets: true,
      upperCaseAlphabets: true,
      specialChars: false,
    });
  }
  generateRandomCoupon(size = 10): string {
    return otpGenerator.generate(size, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: true,
      specialChars: false,
    });
  }

  generateRandomPassword(size = 21): string {
    const data = otpGenerator.generate(size, {
      digits: true,
      lowerCaseAlphabets: true,
      upperCaseAlphabets: true,
      specialChars: true,
    });

    return 'D$' + data;
  }

  generateRandomNumber(size = 6): string {
    return otpGenerator.generate(size, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
  }
}
