<template>
<v-card>
    <v-card-text>
        <v-row>
            aaaaa
            <div style="width:100%; min-height:500px;">
                <line-chart :data="data" />
            </div>
        </v-row>
    </v-card-text>
</v-card>    
</template>
<script>
export default {
	data:()=>({
        data: [
            // {
            //     name: "収入",
            //     data: [
            //         { label: "2016", value: 1040000 },
            //         { label: "2017", value: 1200000 },
            //         { label: "2018", value: 1800000 },
            //         { label: "2019", value: 2000000 }
            //     ]
            // },
            // {
            //     name: "支出",
            //     data: [
            //         { label: "2016", value: 540000 },
            //         { label: "2017", value: 400000 },
            //         { label: "2018", value: 600000 },
            //         { label: "2019", value: 700000 }
            //     ]
            // },
        ]
    }),
    mounted: async function(){
        const lineId = "U93814e4201d941a62c872d21a0ba86e2"
        const db = this.$firebase.firestore();
        const doc = await db.doc("users/" + lineId).get();
        const data = doc.data()
        
        // for(const goal in data.goal){
        //     console.log(goal)
        // }

        const profits = []
        for(let i = 0; i < 12; i++){
            const goal = data.goal[`2020_${i+1}`]
            if(goal){
                profits.push({
                    label:`${i+1}月`,
                    value:goal.profit
                })

            }else{
                profits.push({
                    label:`${i+1}月`,
                    value:0
                })
            }
        }

        this.data.push({
            name: "目標営業利益",
            data: profits
        })

    }
}
</script>
