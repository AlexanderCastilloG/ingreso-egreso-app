import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from './ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {

    // El Store de Redux son Inmutables=> Que no puede ser cambiado o alterado.

    // Primer Forma - Para eliminar la referencia
    return [...items].sort( (a,b) => {
            if( a.tipo === "ingreso"){
              return -1;
            }else {
              return 1;
            }
          });

    // Segunda Forma - Para eliminar la referencia
    // return items.slice().sort((a,b) => {
    //   if( a.tipo === 'ingreso'){
    //     return -1;
    //   }else {
    //     return 1;
    //   }
    // });
  }

}
