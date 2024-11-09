import { ProductWaste } from "./ProductWaste";
import { QuantityWaste } from "./QuantityWaste";
import { CauseWaste } from "./CauseWaste";

export class Waste{
  idWaste !: string;
  product !: ProductWaste;
  quantityWaste !: QuantityWaste;
  cause !: CauseWaste;
  dateRegister !: Date;
}