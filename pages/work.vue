<template>
	<div>
		<h1 align="center" class="white-text">ワーク</h1>

		<v-card outlined style="padding: 10px">
            <h3 align="center">
                報告年月
            </h3>
			<v-container>
				<template>
					<v-row>
						<v-col cols="6" md="6">
							<v-select :items="years" label="年" v-model="datetime.year" @change="onChangeInput(datetime.year,datetime.month)"></v-select>
						</v-col>
						<v-col cols="6" md="6">
							<v-select :items="months" label="月" v-model="datetime.month" @change="onChangeInput(datetime.year,datetime.month)"></v-select>
						</v-col>
					</v-row>
				</template>
			</v-container>
		</v-card>

		<v-card outlined class="pt-5 mt-5">
			<h3 align="center">
				売上・利益目標
			</h3>
            <v-container>
				<template>
					<v-row>
						<v-col cols="1" md="1" class="flex-center">
                            <label class="flex-center">売上</label>
                        </v-col>
                        <v-col cols="11" md="11">
                            <v-text-field
                                
                                v-model="sale"
                                label="実績/目標"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="1" md="1" class="flex-center">
                            <label class="flex-center">経費</label>
                        </v-col>
                        <v-col cols="11" md="11">
                            <v-text-field
                               
                                v-model="price"
                                label="実績/目標"
                            ></v-text-field>
                        </v-col>
                    　<v-col cols="1" md="1" class="flex-center">
                            <label class="flex-center">営業利益</label>
                        </v-col>
                        <v-col cols="11" md="11">
                            <v-text-field
                                
                                v-model="profit"
                                label="実績/目標"
                            ></v-text-field>
                        </v-col>
					</v-row>
				</template>
			</v-container>
		</v-card>
		
		<template v-for="(category,idx) in categorys">	
			<v-card class="mb-3 px-3　pt-5 mt-5" :key="idx">
                <h3 align="center">
                    内訳
                </h3>
				<v-row :key="idx">
					<v-col cols="1" md="1">
                        
					</v-col>
					<v-col cols="11" md="10">
						<v-text-field
							v-model="category.categoryname"
							label="カテゴリ名"
						></v-text-field>
					</v-col>
					<v-container>
						<template v-for="(work,idx2) in category.works">
							<v-row :key="idx2">
                                <v-col cols="1" md="1">
								</v-col>
								<v-col cols="1" md="1">
                                    <label class="flex-center">案件名</label>
								</v-col>
								<v-col cols="9" md="9">
									<v-text-field
										v-model="work.name"
									></v-text-field>
								</v-col>
                                <v-col cols="1" md="1">
								</v-col>
								<v-col cols="1" md="1">
								</v-col>
								<v-col cols="1" md="1">
                                    <label class="flex-center">売上</label>
								</v-col>
								<v-col cols="9" md="9">
									<v-text-field
										v-model="work.name"
										label="売上✖️件数"
									></v-text-field>
								</v-col>
                                <v-col cols="1" md="1">
								</v-col>
							    <v-col cols="1" md="1">
								</v-col>
								<v-col cols="1" md="1">
                                    <label class="flex-center">費用</label>
								</v-col>
								<v-col cols="9" md="9">
									<v-text-field
										v-model="work.name"
										label="費用✖️件数"
									></v-text-field>
								</v-col>
                                <v-col cols="1" md="1">
								</v-col>
							</v-row>
							<v-divider :key="'hr-'+idx2"></v-divider>
						</template>
						
					</v-container>
				</v-row>
			</v-card>
			<v-divider :key="'hr-'+idx"></v-divider>
		</template>

		<v-card outlined style="padding: 10px">
            <h3 align="center">
                達成率
            </h3>
			<v-container>
				<template>
					<v-row>
                        <v-col cols="1" md="1">
						</v-col>
						<v-col cols="10" md="10">
                            <v-text-field
                                
                                label="費用✖️件数"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="1" md="1">
						</v-col>
					</v-row>
				</template>
			</v-container>
		</v-card>

        <v-card outlined style="padding: 10px" class="mb-3 px-3　pt-5 mt-5">
            <h3 align="center">
                アポ件数
            </h3>
			<v-container>
				<template>
					<v-row>
						<v-col cols="3" md="3">
                            <v-text-field
                                
                                label="受注"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3" md="3">
                            <v-text-field
                                
                                label="失注"
                            ></v-text-field>
                        </v-col>
						<v-col cols="3" md="3">
                            <v-text-field
                                
                                label="検討"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3" md="3">
                            <v-text-field
                                
                                label="合計"
                            ></v-text-field>
                        </v-col>
					</v-row>
				</template>
			</v-container>
		</v-card>

         <v-card outlined style="padding: 10px" class="mb-3 px-3　pt-5 mt-5">
            <h3 align="center">
                交流会・セミナー
            </h3>
			<v-container>
				<template>
					<v-row>
						<v-col cols="4" md="4">
                            <v-text-field
                                
                                label="交流会"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4" md="4">
                            <v-text-field
                                
                                label="アポ数"
                            ></v-text-field>
                        </v-col>
						 <v-col cols="4" md="4">
                            <v-text-field
                                
                                label="決定率"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4" md="4">
                            <v-text-field
                                
                                label="セミナー"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4" md="4">
                            <v-text-field
                                
                                label="アポ数"
                            ></v-text-field>
                        </v-col>
						<v-col cols="4" md="4">
                            <v-text-field
                                
                                label="決定率"
                            ></v-text-field>
                        </v-col>
					</v-row>
				</template>
			</v-container>
		</v-card>
		
		<v-card outlined style="padding: 10px" class="mb-3 px-3　pt-5 mt-5">
            <h3 align="center">
                紹介営業
            </h3>
			<v-container>
				<template>
					<v-row>
						<v-col cols="4" md="4">
                            <v-text-field
                                
                                label="交流会"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4" md="4">
                            <v-text-field
                                
                                label="アポ数"
                            ></v-text-field>
                        </v-col>
						<v-col cols="4" md="4">
                            <v-text-field
                                
                                label="決定率"
                            ></v-text-field>
                        </v-col>
                       
					</v-row>
				</template>
			</v-container>
		</v-card>

        <v-card outlined style="padding: 10px" class="mb-3 px-3　pt-5 mt-5">
            <h3 align="center">
                SNS
            </h3>
			<v-container>
				<template>
					<v-row>
						<v-col cols="4" md="4">
                            <v-text-field
                                
                                label="総フォロワー"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4" md="4">
                            <v-text-field
                                
                                label="追加フォロワー"
                            ></v-text-field>
                        </v-col>
						<v-col cols="4" md="4">
                            <v-text-field
                                
                                label="増加フォロワー"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4" md="4">
                            <v-text-field
                                
                                label="フォロパ率"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4" md="4">
                            <v-text-field
                                
                                label="仕事に繋がった件数"
                            ></v-text-field>
                        </v-col>
					</v-row>
				</template>
			</v-container>
		</v-card>

		<v-card outlined class="pt-5 mt-5">
			<h3 align="center">
				今月の課題
			</h3>
			<v-container>
				<template v-for="(task,idx) in tasks">
					<v-row :key="idx">
						<v-col cols="1" md="1">
							
						</v-col>

						<v-col cols="10" md="10">
							<v-text-field
								v-model="task.name"
								label="課題"
							></v-text-field>
						</v-col>
					
					</v-row>
				</template>
				<v-row> 
					<v-layout justify-center style="padding: 10px">
						
					</v-layout>
				</v-row>
			</v-container>
		</v-card>

		<template>
			<v-row justify="center">
				<v-dialog v-model="dialog" persistent max-width="290">
					<v-card>
						<v-card-title class="headline">登録済みのデータを呼び出しますか?</v-card-title>
						<v-card-text>「はい」を選択すると登録済みのデータを呼び出します。</v-card-text>
						<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="green darken-1" text @click="onDialogNo()">いいえ</v-btn>
						<v-btn color="green darken-1" text @click="onDialogYes()">はい</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-row>
		</template>

		<template>
			<div class="text-center">
				<v-dialog v-model="load" hide-overlay persistent width="300" origin="top left" >
					<v-card color="primary" dark>
						<v-card-text>loding
							<v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
						</v-card-text>
					</v-card>
				</v-dialog>
			</div>
		</template>

	</div>
</template>


<script>
export default {
	data:()=>({
		userProfile:{
			userId:null
		},
		formData: {
			name: ''
		},
		lineId: null,
		categorys:[
			{
				categoryname:null,
				works:[
					{
						name:null,
						price:null,
						cost: null,
						num: null,
						cvr: null
					},
					{
						name:null,
						price:null,
						cost: null,
						num: null,
						cvr: null
					}
				]
			}
		],
		
		tasks:[
			{
				name:null
			}
		],
		socials:[
			{
				snsType:null,
				accountName:null,
				follower:0,
				targetFollower:0
			}
		],
		connections:[
			{
				introduce: null
			}
		],
		datetime:{
			year:null,
			month:null
		}
		,
		years:[],
		months:[],
		count:0,
		dialog: false,
        load: false,
        sale:null,
        price:null,
        profit:null,
      
	}),
	filters: {
		moneyFilter(val){
			console.log(val.toLocaleString())
			return val.toLocaleString();
		}
	},
	methods:{
	
		async onChangeInput(year,month){
			this.load = true
			const db = this.$firebase.firestore();
			const doc = await db.doc("users/" + this.userProfile.userId).get();
			const data = doc.data()
			this.load = false
			let toalGoalPrice = 0
			let toalGoalCost = 0
            let totalGoalProfit = 0
            let toalReportPrice = 0
			let toalReportCost = 0
            let totalReportProfit = 0
            let toalAporeportPrice = 0
			let toalAporeportCost = 0
			let totalAporeportProfit = 0

            //目標
			if(`${year}_${month}` in data.goal){
                const goal = data.goal[`${this.datetime.year}_${this.datetime.month}`]
                console.log(data.goal) 
                for (let j=0; j<goal.categorys.length;j++){
                    for (let i=0; i<goal.categorys[j].works.length;i++){
                        toalGoalPrice = toalGoalPrice + (goal.categorys[j].works[i].price * goal.categorys[j].works[i].num)
                        toalGoalCost = toalGoalCost + (goal.categorys[j].works[i].cost * goal.categorys[j].works[i].num)
                    }
                }
                totalGoalProfit = toalGoalPrice - toalGoalCost
            }
            
            //受注レポート
			for (let k=1; k<32;k++){
				if(`${year}_${month}_${k}` in data.report){
					const report = data.report[`${year}_${month}_${k}`]
					console.log(data.report) 
					for (let j=0; j<report.categorys.length;j++){
						for (let i=0; i<report.categorys[j].works.length;i++){
							toalReportPrice = Number(toalReportPrice) + Number(report.categorys[j].works[i].price)
							toalReportCost = Number(toalReportCost) + Number(report.categorys[j].works[i].cost)
						}
					}
				}
			}
			totalReportProfit = toalReportPrice - toalReportCost
            
            
            // if(`${year}_${month}` in data.aporeport){
            //      const aporeport = data.aporeport[`${this.datetime.year}_${this.datetime.month}`]
            //      for (let j=0; j<aporeport.categorys.length;j++){
            //         for (let i=0; i<aporeport.categorys[j].works.length;i++){
            //             toalAporeportPrice = toalAporeportPrice + (aporeport.categorys[j].works[i].price * aporeport.categorys[j].works[i].num)
            //             toalAporeportCost = toalAporeportCost + (aporeport.categorys[j].works[i].cost * aporeport.categorys[j].works[i].num)
            //         }
            //     }
            //     totalAporeportProfit = toalAporeportPrice - toalAporeportCost

            // }
            
            this.sale = `${toalReportPrice}/${toalGoalPrice}`
            this.price = `${toalReportCost}/${toalGoalCost}`
            this.profit = `${totalReportProfit}/${totalGoalProfit}`
			
        },
        
		async onDialogYes(){
			this.load = true
			const db = this.$firebase.firestore();
			const doc = await db.doc("users/" + this.userProfile.userId).get();
			const data = doc.data()
            const goal = data.goal[`${this.datetime.year}_${this.datetime.month}`]
            const report = data.report[`${this.datetime.year}_${this.datetime.month}`]
            const aporeport = data.aporeport[`${this.datetime.year}_${this.datetime.month}`]
			
			this.categorys = current.categorys
			this.count = current.count
			this.checkboxItems = current.checkboxItems
			this.socials = current.socials
			this.connections = current.connections
			this.tasks = current.tasks

			this.load = false
			this.dialog = false

        },
        
		onDialogNo(){
			this.dialog = false
		},

	
	},
	mounted: async function(){

		console.log(liff)
		await liff.init({
			liffId:"1654259536-9QolwByP"
		})
		try{
			this.userProfile = await liff.getProfile()
		}catch(e){
			this.userProfile.userId = "test"
		}
		
		for (var i=0; i<100;i++){
			this.years.push(2019 + i)
		}

		for (var j=1; j<13;j++){
			this.months.push(j)
		}

		var hiduke =new Date();
		hiduke.setMonth( hiduke.getMonth() +1);
		this.datetime.year = hiduke.getFullYear();
		this.datetime.month = hiduke.getMonth()+1;
			
		
		
	}
	
}
</script>

<style>
.white-text{
	color: white;
}
.v-label {
    font-size: 0.7rem;
}
</style>