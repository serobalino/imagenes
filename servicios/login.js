import axios from 'axios';

const PREFIJO = '/api/Mdl/';

export default {
    todos(id){
        return axios.all([
            this.individuales(id),
            this.kit(id)
        ]);
    },
    individuales(id) {
        const dto = { ndt1: id, bdt3: true,ndt5:2 }; //modelo comercial// ndt5  1 es kit o 2 no es kit
        return axios.post(`${PREFIJO}VmSlIdV`, dto);
    },
    kit(id) {
        const dto = { ndt1: id, bdt3: true,ndt5:1 }; //modelo comercial// ndt5  1 es kit o 2 no es kit
        return axios.post(`${PREFIJO}VmSlIdV`, dto);
    }
};
