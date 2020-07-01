<template>
	<div>
		<h1 align="center" class="white-text">行動計画</h1>

		<v-card outlined style="padding: 10px">
		<h3 align="center">
			活動年月
		</h3>
			<v-container>
				<template>
					<v-row>
						<v-col cols="6" md="6">
							<v-select :items="years" label="年" v-model="datetime.year"></v-select>
						</v-col>
						<v-col cols="6" md="6">
							<v-select :items="months" label="月" v-model="datetime.month"></v-select>
						</v-col>
					</v-row>
				</template>
			</v-container>
		</v-card>

		<v-card outlined class="pt-5 mt-5">
			<h3 align="center">
				売上・利益目標
			</h3>
			<v-form>
				<v-container>
					<template v-for="(work,idx) in works">
						<v-row :key="idx">
							<v-col cols="2" md="2">
								<v-btn color="primary" fab x-small dark @click="onRemoveProjectButton(idx)">
									<v-icon>mdi-minus</v-icon>
								</v-btn>
							</v-col>
							<v-col cols="4" md="3">
								<v-text-field
									v-model="work.name"
									label="案件名"
								></v-text-field>
							</v-col>
							<v-col cols="3" md="3">
								<v-text-field
									v-model="work.price"
									label="売上"
									type="number"
								></v-text-field>
							</v-col>
							<v-col cols="3" md="3">
								<v-text-field
									v-model="work.cost"
									label="費用"
									type="number"
								></v-text-field>
							</v-col>
							<v-col cols="3" md="3">
								<v-text-field
									v-model="work.num"
									label="受注数"
									type="number"
								></v-text-field>
							</v-col>
							<v-col cols="3" md="3">
								<v-select
									:items="selectItems"
									label="CVR"
									v-model="work.cvr"
								></v-select>
							</v-col>
						</v-row>
						<v-divider :key="'hr-'+idx"></v-divider>
					</template>
					<v-row> 
						<v-layout justify-center style="padding: 10px">
							<v-btn color="error" fab x-small dark @click="onAddProjectButton()">
								<v-icon>mdi-plus</v-icon>
							</v-btn>
						</v-layout>
					</v-row>
				</v-container>
			</v-form>
		</v-card>
		<v-card outlined class="pt-5 mt-5">
			<h3 align="center">
				アポイント
			</h3>
			<v-container>
				<v-row>
					<v-col cols="12" class="pt-0">
						<v-text-field
							v-model="count"
							label="件数"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" class="pb-0">
						<h4 align="left">
							根拠
						</h4>
					</v-col>
					<v-col class="pt-0" cols="4" md="4" style="padding:0px">
						<v-checkbox
							v-model="checkboxItems.sns" 
							label="SNS" 
							color="red" 
							hide-details
							class="pl-3 ml-3 text-caption"
							value="SNS"
							
						></v-checkbox>
					</v-col>
					<v-col cols="4" md="4" style="padding:0px">
						<v-checkbox 
							v-model="checkboxItems.web" 
							label="Web" 
							color="red darken-3" 
							hide-details
							class="pl-3 ml-3"
							value="Web"
						></v-checkbox>
					</v-col>
					<v-col cols="4" md="4" style="padding:0px">
						<v-checkbox
							v-model="checkboxItems.friend"
							label="知り合い"
							color="indigo"
							hide-details
							class="pl-3 ml-3"
							value="知り合い"
						></v-checkbox>
					</v-col>
				</v-row>	
				<v-row>
					<v-col cols="4" md="4" style="padding:0px">
						<v-checkbox
							v-model="checkboxItems.introdctioin"
							label="紹介"
							color="indigo darken-3"
							hide-details
							class="pl-3 ml-3"
							value="紹介"
						></v-checkbox>
					</v-col>
					<v-col cols="4" md="4" style="padding:0px">
						<v-checkbox
							v-model="checkboxItems.exchangeMeeting"
							label="交流会"
							color="orange"
							hide-details
							class="pl-3 ml-3"
							value="交流会"
						></v-checkbox>
					</v-col>
					<v-col cols="4" md="4" style="padding:0px;">
						<v-checkbox
							v-model="checkboxItems.seminar"
							label="セミナー"
							color="orange darken-3"
							hide-details
							class="pl-3 ml-3"
							value="セミナー"
						></v-checkbox>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="4" md="4" style="padding:0px">
						<v-checkbox
							v-model="checkboxItems.intermediary"
							label="仲介サイト"
							color="indigo darken-3"
							hide-details
							class="pl-3 ml-3"
							value="仲介サイト"
						></v-checkbox>
					</v-col>
					<v-col cols="4" md="4" style="padding:0px">
					</v-col>
					<v-col cols="4" md="4" style="padding:0px;">
					</v-col>
				</v-row>
			</v-container>
		</v-card>

		<v-card outlined class="pt-5 mt-5">
			<h3 align="center">
				SNS
			</h3>
			<v-container>
				<template v-for="(social,idx) in socials">
					<v-row :key="idx">
						<v-col cols="2" md="2">
							<v-btn color="primary" fab x-small dark @click="onRemoveSnsButton(idx)">
								<v-icon>mdi-minus</v-icon>
							</v-btn>
						</v-col>

						<v-col cols="9" md="9">
							<v-select
								:items="selectBoxItems"
								label="SNS"
								v-model="social.snsType"
								
							></v-select>
						</v-col>

						<v-col cols="12" md="12"> 
							<v-text-field
								v-model="social.accountName"
								label="アカウント名"
							></v-text-field>
						</v-col>

						<v-col cols="6" md="6">
							<v-text-field
								v-model="social.follower"
								label="フォロワー数"
								type="number"
							></v-text-field>
						</v-col>

						<v-col cols="6" md="6">
							<v-text-field
								v-model="social.targetFollower"
								label="目標フォロワー数"
								type="number"
							></v-text-field>
						</v-col>

						<v-col cols="12" md="12">
							<v-divider :key="'hr-'+idx"></v-divider>
						</v-col>
					</v-row>
				</template>
				<v-row> 
					<v-layout justify-center style="padding: 10px">
						<v-btn color="error" fab x-small dark @click="onAddSnsButton()">
							<v-icon>mdi-plus</v-icon>
						</v-btn>
					</v-layout>
				</v-row>
			</v-container>
		</v-card>

		<v-card outlined class="pt-5 mt-5">
			<h3 align="center">
				紹介営業・関係構築
			</h3>
			<v-container>
				<template v-for="(connection,idx) in connections">
					<v-row :key="idx">
						<v-col cols="2" md="2">
							<v-btn color="primary" fab x-small dark @click="onRemoveConnectButton(idx)">
								<v-icon>mdi-minus</v-icon>
							</v-btn>
						</v-col>

						<v-col cols="9" md="9">
							<v-text-field
								v-model="connection.introduce"
								label="紹介営業・関係構築"
							></v-text-field>
						</v-col>

					</v-row>
				</template>
				<v-row> 
					<v-layout justify-center style="padding: 10px">
						<v-btn color="error" fab x-small dark @click="onAddConnectButton()">
							<v-icon>mdi-plus</v-icon>
						</v-btn>
					</v-layout>
				</v-row>
			</v-container>
		</v-card>

		<v-card outlined class="pt-5 mt-5">
			<h3 align="center">
				今月の課題
			</h3>
			<v-container>
				<template v-for="(task,idx) in tasks">
					<v-row :key="idx">
						<v-col cols="2" md="2">
							<v-btn color="primary" fab x-small dark @click="onRemoveTaskButton(idx)">
								<v-icon>mdi-minus</v-icon>
							</v-btn>
						</v-col>

						<v-col cols="9" md="9">
							<v-text-field
								v-model="task.name"
								label="課題"
							></v-text-field>
						</v-col>
					
					</v-row>
				</template>
				<v-row> 
					<v-layout justify-center style="padding: 10px">
						<v-btn color="error" fab x-small dark @click="onAddTaskButton()">
							<v-icon>mdi-plus</v-icon>
						</v-btn>
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
		checkboxItems:{
			sns: false,
			web: false,
			friend: false,
			introdctioin: false,
			exchangeMeeting: false,
			seminar: false,
			intermediary: false
		},
		lineId: null,
		works:[
			{
				name:"testName",
				price:100000,
				cost: 50000,
				num: 5,
				cvr: 25
			},
			{
				name:"testName2",
				price:200000,
				cost: 30000,
				num: 3,
				cvr: 20
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
		selectItems:[0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100],
		selectBoxItems:["instagram","twitter"],
		years:[],
		months:[],
		count:0
	}),
	filters: {
		moneyFilter(val){
			console.log(val.toLocaleString())
			return val.toLocaleString();
		}
	},
	methods:{
		onRemoveProjectButton(idx){
			this.works.splice(idx,1)
		},
		onRemoveTaskButton(idx){
			this.tasks.splice(idx,1)
		},
		onRemoveSnsButton(idx){
			this.socials.splice(idx,1)
		},
		onRemoveConnectButton(idx){
			this.connections.splice(idx,1)
		},
		onAddProjectButton(){
			this.works.push({
				name:"new",
				price:0,
				cost:0,
				num:0,
				cvr:0
			})
		},
		onAddTaskButton(){
			this.tasks.push({
				name:"new"
			})
		},
		onAddSnsButton(){
			this.socials.push({
				snsType:null,
				accountName:null,
				follower:0,
				targetFollower:0
			})
		},
		onAddConnectButton(){
			this.connections.push({
				introduce: null,
				relationship:null
			})
		},
		submit(){
			//TODO: テキストをデータからいい感じに作成	
			const formatter = new Intl.NumberFormat('ja-JP');	
			let subject = "行動計画:"	
			let subject2 = "アポイント:"
			let textMessage
			let toalPrice = 0
			let toalCost = 0
			let profit = 0
			let message = `${this.datetime.year}年${this.datetime.month}月の売上、利益目標 \n\n`

			for (let i=0; i<this.works.length;i++){
				toalPrice = toalPrice + (this.works[i].price * this.works[i].num)
				toalCost = toalCost + (this.works[i].cost * this.works[i].num)
			}

			profit = toalPrice - toalCost

			message =  message + `【売上】${formatter.format(toalPrice)}円 \n` + 
								 `【経費】${formatter.format(toalCost)}円 \n` +
								 `【営業利益】${formatter.format(profit)}円 \n\n` +
								 `■売上と利益それぞれの内訳 \n\n` 
							
								

			for (let i=0; i<this.works.length;i++){
				message =  message +  `【${this.works[i].name}】\n` +
								      `売上...${formatter.format(this.works[i].price)}円 ×  ${formatter.format(this.works[i].num)}件 =` + formatter.format((this.works[i].price * this.works[i].num))  +  `円 \n` +
								      `経費...${formatter.format(this.works[i].cost)}円 ×  ${formatter.format(this.works[i].num)}件 =` +  formatter.format((this.works[i].cost  * this.works[i].num))  +  `円 \n\n` 
									  //`営業利益...(${this.works[i].price}円 - ${this.works[i].cost}円) ×  ${this.works[i].num}件 = ${(this.works[i].price - this.works[i].cost) * this.works[i].num} 円 \n\n`
									  
			}

			message = message + `■アポイント${formatter.format(this.count)}件 \n\n` +
								`■アポイントの根拠 \n` 

			for (const [key, value] of Object.entries(this.checkboxItems)) {
				if(value !== false){
					message =  message + `${value}\n`
				}
			}
			
			for (let i=0; i<this.socials.length;i++){
				message =  message + `\n【${this.socials[i].snsType}】\n` + 
									 `アカウント名 ${this.socials[i].accountName} \n` +
									 `フォロワー数 ${formatter.format(this.socials[i].follower)} \n` +
									 `目標フォロワー数 ${formatter.format(this.socials[i].targetFollower)} \n\n`
									 
			}

			for (let i=0; i<this.connections.length;i++){
				message =  message + ` ■紹介営業・関係構築 \n` + 
									 `${this.connections[i].introduce} \n\n` 
								
			}

			for (let i=0; i<this.connections.length;i++){
				message =  message + `■今月の課題 \n` + 
									 `${this.tasks[i].name} \n\n` 
									 
			}

			const date = `${this.datetime.year}_${this.datetime.month}`
			const goal = {}
			goal[date] = {
				works:this.works,
				count:this.count,
				checkboxItems:this.checkboxItems,
				socials:this.socials,
				connections:this.connections,
				tasks:this.tasks
			}
			const db = this.$firebase.firestore();
			db.doc("users/" + "test").set({
				"goal:":{goal}
			},{merge:true}).then(()=>{
				alert("save")
			})

			alert(message);
			
			liff.sendMessages([
				{
					type:'text',
					text:message
				}
			])
			.then(() => {
				alert('message sent');
			})
			.catch((err) => {
				alert(err);
			});
		}
	},
	mounted: async function(){
		liff.init({
			liffId:"1654259536-9QolwByP"
		})
		// .then(async data=>{
		// 	if (!liff.isLoggedIn()) {
		// 		//liff.login({ redirectUri: "https://bizprison-a9fc9.web.app" });
		// 	}else{
		// 		//initializeApp()
		// 		// const profile = await liff.getProfile()
		// 		// const {
		// 		// 	userId,
		// 		// 	displayName,
		// 		// 	pictureUrl,
		// 		// 	statusMessage
		// 		// } = profile
		// 		// alert(userId)
		// 		// alert(displayName)
		// 		// alert(pictureUrl)
		// 		// liff.sendMessages([
		// 		// 	{
		// 		// 		type:'text',
		// 		// 		text:statusMessage
		// 		// 	}
		// 		// ])
		// 		// .then(() => {
		// 		// 	this.userProfile.userId = userId
		// 		// })
		// 		// .catch((err) => {
		// 		// 	alert(err);
		// 		// });
		// 	}
		// }).bind(this)
		// .catch(err=>{
		// 	console.error(err)
		// }),
		
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