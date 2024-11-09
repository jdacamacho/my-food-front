export class CauseWasteConstants {
  static readonly CAUSE_WASTE_EXPIRED = 'Expired';
  static readonly CAUSE_WASTE_EXCESS_PREPARATION = 'Excess preparation';
  static readonly CAUSE_WASTE_BAD_STORAGE = 'Bad storage';
  static readonly CAUSE_WASTE_PREPARATION_ERROR = 'Preparation error';
  static readonly CAUSE_WASTE_CUSTOMER_RETURN = 'Custom return';
  static readonly CAUSE_WASTE_TRANSPORTER_DAMAGE = 'Transporter damage';
  static readonly CAUSE_WASTE_WEATHER_CONDITIONS = 'Weather conditions';
  static readonly CAUSE_WASTE_HANDLING_DAMAGE = 'Handling damage';
  static readonly CAUSE_WASTE_DEFECTIVE_INGREDIENTS = 'Defective ingredients';
  static readonly CAUSE_WASTE_EXCESS_PORTIONS = 'Excess portions';
  static readonly CAUSE_WASTE_CANCELED_ORDER = 'Canceled order';
  static readonly CAUSE_WASTE_CROSS_CONTAMINATION = 'Cross contamination';
  static readonly CAUSE_WASTE_ERROR = 'Error';

  // Método para obtener todas las causas
  static getAllCauses(): string[] {
    return [
      this.CAUSE_WASTE_EXPIRED,
      this.CAUSE_WASTE_EXCESS_PREPARATION,
      this.CAUSE_WASTE_BAD_STORAGE,
      this.CAUSE_WASTE_PREPARATION_ERROR,
      this.CAUSE_WASTE_CUSTOMER_RETURN,
      this.CAUSE_WASTE_TRANSPORTER_DAMAGE,
      this.CAUSE_WASTE_WEATHER_CONDITIONS,
      this.CAUSE_WASTE_HANDLING_DAMAGE,
      this.CAUSE_WASTE_DEFECTIVE_INGREDIENTS,
      this.CAUSE_WASTE_EXCESS_PORTIONS,
      this.CAUSE_WASTE_CANCELED_ORDER,
      this.CAUSE_WASTE_CROSS_CONTAMINATION,
      this.CAUSE_WASTE_ERROR
    ];
  }

  // Método para validar si una causa es válida
  static isValidCause(cause: string): boolean {
    return this.getAllCauses().includes(cause);
  }

  // Método para obtener la descripción de una causa
  public static getCauseDescription(cause: string): string {
    const descriptions: { [key: string]: string } = {
      [this.CAUSE_WASTE_EXPIRED]: 'Productos que han pasado su fecha de caducidad',
      [this.CAUSE_WASTE_EXCESS_PREPARATION]: 'Preparación en exceso de alimentos',
      [this.CAUSE_WASTE_BAD_STORAGE]: 'Almacenamiento inadecuado',
      [this.CAUSE_WASTE_PREPARATION_ERROR]: 'Errores durante la preparación',
      [this.CAUSE_WASTE_CUSTOMER_RETURN]: 'Devoluciones de clientes',
      [this.CAUSE_WASTE_TRANSPORTER_DAMAGE]: 'Daños durante el transporte',
      [this.CAUSE_WASTE_WEATHER_CONDITIONS]: 'Condiciones climáticas adversas',
      [this.CAUSE_WASTE_HANDLING_DAMAGE]: 'Daños por manipulación',
      [this.CAUSE_WASTE_DEFECTIVE_INGREDIENTS]: 'Ingredientes defectuosos',
      [this.CAUSE_WASTE_EXCESS_PORTIONS]: 'Porciones en exceso',
      [this.CAUSE_WASTE_CANCELED_ORDER]: 'Pedidos cancelados',
      [this.CAUSE_WASTE_CROSS_CONTAMINATION]: 'Contaminación cruzada',
      [this.CAUSE_WASTE_ERROR]: 'Otros errores'
    };
    return descriptions[cause] || 'Causa no definida';
  }
}
