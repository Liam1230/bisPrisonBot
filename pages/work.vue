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
			<v-card outlined class="px-3 mb-3" v-for="(social,idx) in socials" :key="idx">
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
										v-model="work.price"
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
										v-model="work.cost"
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
                                v-model="achievement"
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
                                v-model="ordercount"
                                label="受注"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3" md="3">
                            <v-text-field
                                v-model="lostcount"
                                label="失注"
                            ></v-text-field>
                        </v-col>
						<v-col cols="3" md="3">
                            <v-text-field
                                v-model="considerationcount"
                                label="検討"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3" md="3">
                            <v-text-field
                                v-model="sumcount"
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
                                v-model="exchangeMeeting"
                                label="交流会"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4" md="4">
                            <v-text-field
                                v-model="exchangeMeetingApo"
                                label="アポ数"
                            ></v-text-field>
                        </v-col>
						 <v-col cols="4" md="4">
                            <v-text-field
                                v-model="exchangeMeetingDecision"
                                label="決定率"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4" md="4">
                            <v-text-field
                                v-model="seminar"
                                label="セミナー"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4" md="4">
                            <v-text-field
                                v-model="seminarApo"
                                label="アポ数"
                            ></v-text-field>
                        </v-col>
						<v-col cols="4" md="4">
                            <v-text-field
                                v-model="seminarDecision"
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
                                v-model="introdctioin"
                                label="紹介営業"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4" md="4">
                            <v-text-field
                                v-model="introdctioinApo"
                                label="アポ数"
                            ></v-text-field>
                        </v-col>
						<v-col cols="4" md="4">
                            <v-text-field
                                v-model="introdctioinDecision"
                                label="決定率"
                            ></v-text-field>
                        </v-col>
					</v-row>
				</template>
			</v-container>
		</v-card>

		
		<v-card outlined class="px-3 mb-3" v-for="(social,idx3) in socials" :key="idx3+'sns'">  
			<h3 align="center">
				SNS
			</h3>
			<v-container>
				<template>
					<v-row :key="idx3+'sns'" >
						<v-col cols="2" md="2" class="d-flex align-center">
							<v-btn color="primary" fab x-small dark @click="onRemoveSnsButton(idx3)">
								<v-icon>mdi-minus</v-icon>
							</v-btn>
						</v-col>
						<v-col cols="3" md="3">
							<v-text-field
								v-model="social.sumfollower"
								label="総フォロワー"
							></v-text-field>
						</v-col>
						<v-col cols="3" md="3">
							<v-text-field
								v-model="social.addfollower"
								label="追加フォロワー"
								@change="onClacProfit(idx3)"
							></v-text-field>
						</v-col>
						<v-col cols="3" md="3">
							<v-text-field
								v-model="social.increasefollower"
								label="増加フォロワー"
								@change="onClacProfit(idx3)"
							></v-text-field>
						</v-col>
						<v-col cols="1" md="1">
						</v-col>
						<v-col cols="2" md="2">
						</v-col>
						<v-col cols="3" md="3">
							<v-text-field
								v-model="social.followerrate"
								label="フォロパ率"
							></v-text-field>
						</v-col>
						<v-col cols="3" md="3">
							<v-text-field
								v-model="social.followertowork"
								label="仕事に繋がった件数"
							></v-text-field>
						</v-col>
						<v-col cols="4" md="4">
						</v-col>
					</v-row>
				</template>
			</v-container>
		</v-card>
	
		
		<v-row> 
			<v-layout justify-center style="padding: 10px">
				<v-btn color="error" fab x-small dark @click="onAddSnsButton()">
					<v-icon>mdi-plus</v-icon>
				</v-btn>
			</v-layout>
		</v-row>

		<v-card outlined class="pt-5 mt-5">
			<h3 align="center">
				今月の課題
			</h3>
			<v-container>
				<template v-for="(task,idx4) in tasks">
					<v-row :key="idx4">
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

		<div>
			<v-layout justify-center style="padding: 10px">
				<v-btn align="center" @click="submit()">
					Submit
				</v-btn>
				{{lineId}}
			</v-layout>
		</div>

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
		
		connections:[
			{
				introduce: null
			}
		],
		datetime:{
			year:null,
			month:null
		},
		socials:[
			{
				sumfollower:null,
				addfollower:null,
				increasefollower:null,
				followerrate:null,
				followertowork:null,
			}
		],
		years:[],
		months:[],
		count:0,
		dialog: false,
        load: false,
        sale:null,
        price:null,
		profit:null,
		achievement:null,
		ordercount:null,
		lostcount:null,
		considerationcount:null,
		sumcount:null, 
		exchangeMeeting:null,
		seminar:null,
		exchangeMeetingApo:null,
		seminarApo:null,
		exchangeMeetingDecision:null,
		seminarDecision:null,
		introdctioin:null,
		introdctioinApo:null,
		introdctioinDecision:null,
		  

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
			let totalOrder = 0
			let totalLost = 0
			let totalonCsideration = 0
			let sumCount = 0
			let Inputcategorys = [
					{
						categoryname:null,
						works:[
							{
								name:null,
								price:null,
								cost: null,
							}
						]
					}
				]
			let cntplus = 0
			let cntadd = 0
			let InputcategorysCnt = 0
			let categorynameCnt = 0

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
				this.tasks = goal.tasks
			}

            //受注レポート
			for (let k=1; k<32;k++){
				if(`${year}_${month}_${k}` in data.report){
					const report = data.report[`${year}_${month}_${k}`]
					//console.log(data.report) 
					for (let j=0; j<report.categorys.length;j++){
						for (let i=0; i<report.categorys[j].works.length;i++){
							if(!Inputcategorys[0].categoryname){
								console.log("1回目")
								Inputcategorys = []
								Inputcategorys.push({
									categoryname:report.categorys[j].categoryname,
									works:[
										{
											name:report.categorys[j].works[i].name,
											price:Number(report.categorys[j].works[i].price * report.categorys[j].works[i].num),
											cost: Number(report.categorys[j].works[i].cost * report.categorys[j].works[i].num),
										}
									]
								})
							}else{
								let judgment = true
								for (let f=0; f<Inputcategorys.length;f++){
									for (let e=0; e<Inputcategorys[f].works.length;e++){
										console.log(report.categorys[j].works[i].name)
										if(Inputcategorys[f].works[e].name == report.categorys[j].works[i].name){
											judgment = false
											console.log(judgment)
											Inputcategorys[f].works[e].price = Number(Inputcategorys[f].works[e].price) + Number(report.categorys[j].works[i].price * report.categorys[j].works[i].num)
											Inputcategorys[f].works[e].cost = Number(Inputcategorys[f].works[e].cost) + Number(report.categorys[j].works[i].cost * report.categorys[j].works[i].num)
										}
									}
								}

								if(judgment){
									console.log("追加:" + cntadd)
									cntadd ++
									Inputcategorys.push({
										categoryname:report.categorys[j].categoryname,
										works:[
											{
												name:report.categorys[j].works[i].name,
												price:Number(report.categorys[j].works[i].price * report.categorys[j].works[i].num),
												cost: Number(report.categorys[j].works[i].cost * report.categorys[j].works[i].num),
											}
										]
									})
								}
							}
							toalReportPrice = Number(toalReportPrice) + Number(report.categorys[j].works[i].price * report.categorys[j].works[i].num)
							toalReportCost = Number(toalReportCost) + Number(report.categorys[j].works[i].cost * report.categorys[j].works[i].num)
						}
					}
				}
			}

			totalReportProfit = toalReportPrice - toalReportCost
			this.categorys = Inputcategorys
			
			//アポレポート
			for (let k=1; k<32;k++){
				if(`${year}_${month}_${k}` in data.aporeport){
					const aporeport = data.aporeport[`${year}_${month}_${k}`]
					console.log(data.aporeport) 
					for (let j=0; j<aporeport.categorys.length;j++){
						if(aporeport.categorys[j].ordertype == "受注"){
							totalOrder = totalOrder + 1
						}else if (aporeport.categorys[j].ordertype == "失注") {
							totalLost = totalLost + 1
						}else{
							totalonCsideration = totalonCsideration + 1
						}
					}

					sumCount = totalOrder + totalLost + totalonCsideration
				}
			}
			
			this.ordercount = totalOrder
			this.lostcount = totalLost
			this.considerationcount = totalonCsideration
			this.sumcount = sumCount

            this.sale = `${toalReportPrice}/${toalGoalPrice}`
            this.price = `${toalReportCost}/${toalGoalCost}`
            this.profit = `${totalReportProfit}/${totalGoalProfit}`
			this.achievement = Math.round((totalReportProfit / totalGoalProfit) * 100 * 10) / 10 + "%"
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
			//this.socials = current.socials
			this.connections = current.connections
			this.tasks = current.tasks

			this.load = false
			this.dialog = false

        },
        
		onDialogNo(){
			this.dialog = false
		},

		onRemoveSnsButton(idx3){
			this.socials.splice(idx3,1)
		},

		onAddSnsButton(){
			this.socials.push({
				sumfollower:null,
				addfollower:null,
				increasefollower:null,
				followerrate:null,
				followertowork:null,
			})
		},

		onClacProfit(idx3){
			this.socials[idx3].followerrate = Math.round((this.socials[idx3].increasefollower / this.socials[idx3].addfollower) * 100 * 10) / 10 + "%"
		},

		async submit(){
			//TODO: テキストをデータからいい感じに作成	
			this.load = true
			const formatter = new Intl.NumberFormat('ja-JP');		
			let textMessage
			let toalPrice = 0
			let toalCost = 0
			let profit = 0
			let message = `${this.datetime.year}年${this.datetime.month}月の売上、利益目標 \n\n`

			for (let j=0; j<this.categorys.length;j++){
				for (let i=0; i<this.categorys[j].works.length;i++){
					toalPrice = toalPrice + this.categorys[j].works[i].price
					toalCost = toalCost + this.categorys[j].works[i].cost
				}
			}

			profit = toalPrice - toalCost

			message =  message + `【売上】${formatter.format(toalPrice)}円 \n` + 
								 `【経費】${formatter.format(toalCost)}円 \n` +
								 `【営業利益】${formatter.format(profit)}円 \n\n` +
								 `■売上と利益それぞれの内訳 \n\n` 
							
						
			for (let j=0; j<this.categorys.length;j++){
				//message =  message +`【${this.categorys[j].categoryname}】\n` 
				
				for (let i=0; i<this.categorys[j].works.length;i++){
					message =  message +`□${this.categorys[j].categoryname}\n` +
					                    `案件名...${this.categorys[j].works[i].name}\n` +
										`売上...${formatter.format(this.categorys[j].works[i].price)}円 × ${formatter.format(this.categorys[j].works[i].num)}件 = ${formatter.format(this.categorys[j].works[i].price * this.categorys[j].works[i].num)}円 \n` +
										`経費...${formatter.format(this.categorys[j].works[i].cost)}円 × ${formatter.format(this.categorys[j].works[i].num)}件 = ${formatter.format(this.categorys[j].works[i].cost  * this.categorys[j].works[i].num)}円 \n\n` 
										//`営業利益...(${this.works[i].price}円 - ${this.works[i].cost}円) ×  ${this.works[i].num}件 = ${(this.works[i].price - this.works[i].cost) * this.works[i].num} 円 \n\n`
										
				}
			}

			message = message + `■達成率:${this.achievement} \n\n` 

			message = message + `【アポ件数】\n` +
								`受注...${this.ordercount}\n` +
								`失注...${this.lostcount}\n` +
								`検討...${this.considerationcount}\n` +
								`合計...${this.sumcount}\n\n`
								
			message = message + `【交流会・セミナー】\n` +
								`交流会...${this.exchangeMeeting}\n` +
								`アポ数...${this.exchangeMeetingApo}\n` +
								`決定率...${this.exchangeMeetingDecision}\n` +
								`セミナー...${this.seminar}\n` +
								`アポ数...${this.seminarApo}\n` +
								`決定率...${this.seminarDecision}\n\n` 

            message =  message + `■紹介営業・関係構築 \n` +
								`紹介営業...${this.introdctioin}\n` +
								`アポ数...${this.introdctioinApo}\n` +
								`決定率...${this.introdctioinDecision}\n`

			message = message + `\n【SNS】\n`   
								
			for (let i=0; i<this.socials.length;i++){
				message =  message + `総フォロワー... ${formatter.format(this.socials[i].sumfollower)} \n` +
									 `追加フォロワー... ${formatter.format(this.socials[i].addfollower)} \n` +
									 `増加フォロワー... ${formatter.format(this.socials[i].increasefollower)} \n` +
									 `フォロパ率... ${this.socials[i].followerrate} \n` +
									 `仕事に繋がった件数... ${formatter.format(this.socials[i].followertowork)} \n\n` 
									 
			}

			message =  message + `■今月の課題 \n` 

			for (let i=0; i<this.connections.length;i++){
				message =  message +`${this.tasks[i].name} \n` 
									 
			}

			const date = `${this.datetime.year}_${this.datetime.month}`
			const work = {}
			work[date] = {
				categorys:this.categorys,
				sale:this.sale,
				price:this.price,
				profit:this.profit,
				achievement:this.achievement,
				ordercount:this.ordercount,
				lostcount:this.lostcount,
				considerationcount:this.considerationcount,
				sumcount:this.sumcount,
				exchangeMeeting:this.exchangeMeeting,
				exchangeMeetingApo:this.exchangeMeetingApo,
				exchangeMeetingDecision:this.exchangeMeetingDecision,
				seminar:this.seminar,
				seminarApo:this.seminarApo,
				seminarDecision:this.seminarDecision,
				introdctioin:this.introdctioin,
				introdctioinApo:this.introdctioinApo,
				introdctioinDecision:this.introdctioinDecision,
				socials:this.socials,
				tasks:this.tasks
			}
			const db = this.$firebase.firestore();
			db.doc("users/" + this.userProfile.userId).set({
				"work":work
			},{merge:true}).then(()=>{
				this.load = false
				//alert("save")
			})

			//alert(message);
			
			liff.sendMessages([
				{
					type:'text',
					text:message
				}
			])
			.then(() => {
				
				//alert('message sent');
			})
			.catch((err) => {
				//alert(err);
			});
			
		}

	
	},
	mounted: async function(){

		console.log(liff)
		await liff.init({
			liffId:"1654259536-WdOEYoBX"
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