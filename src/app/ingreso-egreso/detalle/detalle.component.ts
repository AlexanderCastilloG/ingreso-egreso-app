import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

// AppState - Extendido
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { IngresoEgresoService } from '../ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[] = [];
  subscription: Subscription = new Subscription();

  constructor(private store: Store<fromIngresoEgreso.AppState>,
              public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso').subscribe( ingresoEgreso => {
          //  console.log(ingresoEgreso.items);
           this.items = ingresoEgreso.items;
        });
  }

  borrarItem(item: IngresoEgreso){
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid).then( msj => {
      Swal.fire({
        title: 'Eliminado',
        text: item.descripcion,
        type: 'success'
      });
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
