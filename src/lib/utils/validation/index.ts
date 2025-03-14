import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsType(types: ((v, a) => boolean)[], validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'wrongType',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value, args: ValidationArguments) {
          return types.some((v) => v(value, args));
        },
        defaultMessage() {
          const lastType = types.pop();
          if (types.length == 0) return `Has to be ${lastType}`;
          return `Can only be ${types.join(', ')} or ${lastType}.`;
        },
      },
    });
  };
}
