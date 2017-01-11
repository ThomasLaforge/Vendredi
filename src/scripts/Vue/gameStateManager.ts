import * as config from '../modules/Configuration'

let template = `
<div>
    <table class="table-bordered table-hover table-condensed table-responsive">
        <thead>
            <tr>
                <th>slot name</th>
            <tr>
        </thead>
        <tbody>
            <tr v-for="(slot, i) in saveSlots">
                <td @click="testClickOnTableCell(i)" :class="selectedSlot === i ? 'test' : ''">{{ slot.key }}</td>
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
        saveSlots : function() : Array<{key : string, value : string}> {
            let res:Array<{key : string, value : string}> = [];
            for(let i=0, len = localStorage.length; i < len; i++) {
                let key = localStorage.key(i);
                if(key.includes(config.SAVE_SLOT_PREFIX)){
                    let value = localStorage.getItem(key);
                    res.push({
                        key : key.replace(config.SAVE_SLOT_PREFIX, ''),
                        value : value
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
            this.$emit('load', config.SAVE_SLOT_PREFIX + this.saveSlots[this.selectedSlot].key)
        },
        testClickOnTableCell(index:number){
            this.selectedSlot = this.selectedSlot !== index ? index : null;
        }
    }
};

export { gameStateManager }