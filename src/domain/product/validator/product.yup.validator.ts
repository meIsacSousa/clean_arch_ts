import * as yup from "yup";
import IValidator from "../../@shared/validator/validator.interface";
import IProduct from "../entity/IProduct";




export default class ProductYupValidator implements IValidator<IProduct> {
    validate(entity: IProduct): void {
        try {
            const schema = yup.object().shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
                price: yup.number()
                    .required("Price is required")
                    .min(1, "Price must be greater than 0")
            });

            schema.validateSync({
                id: entity.id,
                name: entity.name,
                price: entity.price
            }, {
                abortEarly: false
            });

        } catch (erros) {
            const e = erros as yup.ValidationError;

            e.errors.forEach(error => {
                entity.notification.addError({
                    message: error,
                    context: "product"
                });
            }
            );
        }
    }

}