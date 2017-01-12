import * as config from '../modules/Configuration'

let template = `
<div>
    <table class="table-bordered table-striped table-sm table-hover table-responsive">
        <thead class="thead-inverse">
            <tr>
                <th>Slot name</th>
                <th>Date of start</th>
                <th>Date of last change</th>
            <tr>
        </thead>
        <tbody>
            <tr v-for="(slot, i) in saveSlots" @click="testClickOnTableCell(i)" :class="selectedSlot === i ? 'table-info' : ''">
                <td>{{ slot.key }}</td>
                <td>{{ slot.startDate }}</td>
                <td>{{ slot.lastChangeDate }}</td>
            </tr>
        </tbody>
    </table>

    <button @click="save">Save</button>
    <button @click="load">Load</button>
</div>
`

const gameStateManager = {
    template : template,
    data : function() : { selectedSlot : number } {
        return {
            selectedSlot : null
        }
    },
    computed : {
        saveSlots : function() : Array<{key : string, value : string, startDate:string, lastChangeDate:string}> {
            let res:Array<{key : string, value : string, startDate:string, lastChangeDate:string}> = [];
            for(let i=0, len = localStorage.length; i < len; i++) {
                let key = localStorage.key(i);
                if(key.includes(config.SAVE_SLOT_PREFIX)){
                    let value = JSON.parse(localStorage.getItem(key));
                    res.push({
                        key : key.replace(config.SAVE_SLOT_PREFIX, ''),
                        value : value,
                        startDate : config.moment(value._startDate).format('LLL'),
                        lastChangeDate: config.moment(value._lastChangeDate).format('LLL')
                    });
                }
            }
            return res;
        }
    },
    methods: {
        save(){
            this.$emit('save')
        },
        load(){
            if(this.saveSlots[this.selectedSlot].key){
                this.$emit('load', config.SAVE_SLOT_PREFIX + this.saveSlots[this.selectedSlot].key)
            }
        },
        testClickOnTableCell(index:number){
            console.log('testClickOnTableCell', index)
            this.selectedSlot = this.selectedSlot !== index ? index : null;
        }
    }
};

export { gameStateManager }