import { registerDecorator, ValidationOptions } from 'class-validator';

/**
 * For validating date-time difference
 * difference between given two date-time(timestamps) must be 4-12 hours
 * @param property to compare current value with this property's value
 * @param validationOptions
 */
export function IsValidAnswers(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsValidAnswers',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (!value) {
            return false;
          }
          if (!Array.isArray(value)) {
            return false;
          }
          let flag = true;
          for (const i of value) {
            if (!i.optionId) {
              flag = false;
              break;
            }
            // const checkOptionId = isUUID(i.optionId);
            // if (checkOptionId === false) {
            //   flag = false;
            //   break;
            // }
          }
          return flag;
        },
      },
    });
  };
}
