import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

// AppState- State extendido
import * as fromIngresoEgreso from './ingreso-egreso.reducer';

import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accion';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo = 'ingreso';
  loadingSubs: Subscription = new Subscription();
  cargando: boolean;

  constructor(public ingresoEgresoService: IngresoEgresoService,
              private store: Store<fromIngresoEgreso.AppState>) { }

  ngOnInit() {

    this.loadingSubs =  this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
    });

    this.forma = new FormGroup({
      'descripcion' : new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(1))
    });
  }

  crearIngresoEgreso(){

    this.store.dispatch(new ActivarLoadingAction());

    const ingresoEgreso = new IngresoEgreso({...this.forma.value, tipo: this.tipo});

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then( ()=> {

      this.store.dispatch(new DesactivarLoadingAction());

      Swal.fire({
        title: 'Creado',
        text: ingresoEgreso.descripcion,
        type: 'success'
      });

      this.forma.reset({ monto: 0 });
    })
    .catch( error => {
      this.store.dispatch(new DesactivarLoadingAction());
      console.log(error);
    });

  }

  ngOnDestroy(){
    this.loadingSubs.unsubscribe();
  }

}
