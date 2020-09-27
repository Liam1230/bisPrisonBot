<template>
	<div>
		<h1 align="center" class="white-text">行動計画</h1>

		<h3 align="center" class="mt-5 white-text">
			活動年月
		</h3>
		<v-card outlined style="padding: 10px">
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

		<h3 align="center" class="mt-5 white--text">
			売上・利益目標
		</h3>
		<v-card class="mb-3 px-3" :key="idx" v-for="(category,idx) in categorys">
			<v-row>
				<v-col cols="1" md="1" class="d-flex align-center mr-3">
					<v-btn color="primary" fab x-small dark @click="onRemoveCategoryButton(idx)">
						<v-icon>mdi-minus</v-icon>
					</v-btn>
				</v-col>
				<v-col cols="10" md="10">
					<v-text-field
						v-model="category.categoryname"
						label="カテゴリ名"
					></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-divider class="mx-3"></v-divider>
				<template v-for="(work,idx2) in category.works">
					<v-row :key="idx2">
						<v-col cols="1" md="1" class="ml-3 mr-3 d-flex align-center">
							<v-btn color="primary" fab x-small dark @click="onRemoveProjectButton(idx,idx2)">
								<v-icon>mdi-minus</v-icon>
							</v-btn>
						</v-col>
						<v-col cols="4" md="3" >
							<v-text-field
								v-model="work.name"
								label="案件名"
							></v-text-field>
						</v-col>
						<v-col cols="3" md="3" align="right">
							<v-text-field
								v-model="work.price"
								label="売上"
								type="number"
								align="right"
							></v-text-field>
						</v-col>
						<v-col cols="3" md="3">
							<v-text-field
								v-model="work.cost"
								label="費用"
								type="number"
							></v-text-field>
						</v-col>
						<v-col cols="2" md="2">
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
					<v-divider class="mx-3" :key="'hr-'+idx2"></v-divider>
				</template>
			</v-row>
			<v-row> 
				<v-layout justify-center style="padding: 10px">
					<v-btn color="error" small dark @click="onAddProjectButton(idx)">
						案件を追加<v-icon>mdi-plus</v-icon>
					</v-btn>
				</v-layout>
			</v-row>
		</v-card>
		<v-row> 
			<v-layout justify-center style="">
				<v-btn color="error" small dark @click="onAddCategoryButton()">
					カテゴリを追加<v-icon>mdi-plus</v-icon>
				</v-btn>
			</v-layout>
		</v-row>
		
		<h3 align="center" class="white--text mt-5">
			アポイント
		</h3>
		<v-card outlined class="px-3">
			<v-container>
				<v-row>
					<v-col cols="12" class="pt-0">
						<v-text-field
							v-model="count"
							label="件数"
							type="number"
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

		<h3 align="center" class="white--text mt-5">
			SNS
		</h3>
		<v-card outlined class="px-3 mb-3" v-for="(social,idx) in socials" :key="idx+'sns'">
			<v-row>
				<v-col cols="2" md="2" class="d-flex align-center">
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
			</v-row>
		</v-card>
		<v-row> 
			<v-layout justify-center>
				<v-btn color="error" small dark @click="onAddSnsButton()">
					SNSアカウントを追加<v-icon>mdi-plus</v-icon>
				</v-btn>
			</v-layout>
		</v-row>

		<h3 align="center" class="mt-5 white--text">
			紹介営業・関係構築
		</h3>
		<v-card outlined class="">
			<v-container>
				<template v-for="(connection,idx) in connections">
					<v-row :key="idx">
						<v-col cols="2" md="2" class="d-flex align-center">
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
					<v-layout justify-center>
						<v-btn color="error" fab x-small dark @click="onAddConnectButton()">
							<v-icon>mdi-plus</v-icon>
						</v-btn>
					</v-layout>
				</v-row>
			</v-container>
		</v-card>

		<h3 align="center" class="mt-5 white--text">
			今月の課題
		</h3>
		<v-card outlined class="">
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
					<v-layout justify-center>
						<v-btn color="error" fab x-small dark @click="onAddTaskButton()">
							<v-icon>mdi-plus</v-icon>
						</v-btn>
					</v-layout>
				</v-row>
			</v-container>
		</v-card>

		<div>
			<v-layout justify-center class="mt-5">
				<v-btn color="primary" block align="center" @click="submit()">
					送信
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
		// works:[
		// 	{
		// 		name:"testName",
		// 		price:100000,
		// 		cost: 50000,
		// 		num: 5,
		// 		cvr: 25
		// 	},
		// 	{
		// 		name:"testName2",
		// 		price:200000,
		// 		cost: 30000,
		// 		num: 3,
		// 		cvr: 20
		// 	}
		// ],
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
		count:0,
		dialog: false,
		load: false
      
	}),
	filters: {
		moneyFilter(val){
			console.log(val.toLocaleString())
			return val.toLocaleString();
		}
	},
	methods:{
		onRemoveProjectButton(idx,idx2){
			this.categorys[idx].works.splice(idx2,1)
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
		onRemoveCategoryButton(idx){
			this.categorys.splice(idx,1)
		},
		onAddProjectButton(idx){
			this.categorys[idx].works.push({
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
		onAddCategoryButton(){
			this.categorys.push({
				categoryname:null,
				works:[
					{
						name:null,
						price:null,
						cost: null,
						num: null,
						cvr: null
					}
				]
			})
		},
		async checkSubmit(){
			const errorMessages = []
			const patternText = /^.+$/;
			const patternNumber = /^[0-9]|[1-9][0-9]+$/;
			let target = null
			let result = null

			for (let j=0; j<this.categorys.length;j++){
				//target = await this.categorys[j].categoryname
				//result = await target.match(patternText)
				
				if(this.categorys[j].categoryname === null){
					console.log("未入力")
					errorMessages.push("カテゴリ名は必須です。")
				}else{
					console.log("入力あり")
					if(this.categorys[j].categoryname.match(patternText) == null){
						errorMessages.push("カテゴリ名が正しくありません。")
					}
				}

				for (let i=0; i<this.categorys[j].works.length;i++){

					if(this.categorys[j].works[i].name == null){
						errorMessages.push("案件名は必須です。")
					}else{
						if(this.categorys[j].works[i].name.match(patternText) == null){
							errorMessages.push("案件名が正しくありません。")
						}
					}

					if(this.categorys[j].works[i].price == null){
						errorMessages.push("売上は必須です。")
					}else{
						if(String(this.categorys[j].works[i].price).match(patternNumber) == null){
							errorMessages.push("売上が正しくありません。")
						}
					}

					if(this.categorys[j].works[i].cost == null){
						errorMessages.push("費用は必須です。")
					}else{
						if(String(this.categorys[j].works[i].cost).match(patternNumber) == null){
							errorMessages.push("費用が正しくありません。")
						}
					}

					if(this.categorys[j].works[i].num == null){
						errorMessages.push("受注数は必須です。")
					}else{
						if(String(this.categorys[j].works[i].num).match(patternNumber) == null){
							errorMessages.push("受注数が正しくありません。")
						}
					}
				}
			}

			if(this.count == null){
				errorMessages.push("アポイントの件数は必須です。")
			}else{
				if(String(this.count).match(patternNumber) == null){
					errorMessages.push("アポイントの件数が正しくありません。")
				}
			}

			if (errorMessages.length != 0) {
				alert(errorMessages.join('\n'));
				return false;
			}

			return true

		},

		async onChangeInput(year,month){
			this.load = true
			const db = this.$firebase.firestore();
			const doc = await db.doc("users/" + this.userProfile.userId).get();
			const data = doc.data()
			console.log(data.goal)
			this.load = false
			// const current = data.goal[`${year}_${month}`]

			if(`${year}_${month}` in data.goal){
				this.dialog = true
			}

			
		},
		async onDialogYes(){
			this.load = true
			const db = this.$firebase.firestore();
			const doc = await db.doc("users/" + this.userProfile.userId).get();
			const data = doc.data()
			const current = data.goal[`${this.datetime.year}_${this.datetime.month}`]
			
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

		async submit(){
			//TODO: テキストをデータからいい感じに作成	
			this.load = true
			const formatter = new Intl.NumberFormat('ja-JP');	
			let subject = "行動計画:"	
			let subject2 = "アポイント:"
			let textMessage
			let toalPrice = 0
			let toalCost = 0
			let profit = 0
			let message = `${this.datetime.year}年${this.datetime.month}月の売上、利益目標 \n\n`
			if(this.checkSubmit()){
				for (let j=0; j<this.categorys.length;j++){
					for (let i=0; i<this.categorys[j].works.length;i++){
						toalPrice = toalPrice + (this.categorys[j].works[i].price * this.categorys[j].works[i].num)
						toalCost = toalCost + (this.categorys[j].works[i].cost * this.categorys[j].works[i].num)
					}
				}

				profit = toalPrice - toalCost

				message =  message + `【売上】${formatter.format(toalPrice)}円 \n` + 
									`【経費】${formatter.format(toalCost)}円 \n` +
									`【営業利益】${formatter.format(profit)}円 \n\n` +
									`■売上と利益それぞれの内訳 \n\n` 
								
									
				for (let j=0; j<this.categorys.length;j++){
					message =  message +`【${this.categorys[j].categoryname}】\n` 
					
					for (let i=0; i<this.categorys[j].works.length;i++){
						message =  message +`□${this.categorys[j].works[i].name}\n` +
											`売上...${formatter.format(this.categorys[j].works[i].price)}円 × ${formatter.format(this.categorys[j].works[i].num)}件 = ${formatter.format(this.categorys[j].works[i].price * this.categorys[j].works[i].num)}円 \n` +
											`経費...${formatter.format(this.categorys[j].works[i].cost)}円 × ${formatter.format(this.categorys[j].works[i].num)}件 = ${formatter.format(this.categorys[j].works[i].cost  * this.categorys[j].works[i].num)}円 \n\n` 
											//`営業利益...(${this.works[i].price}円 - ${this.works[i].cost}円) ×  ${this.works[i].num}件 = ${(this.works[i].price - this.works[i].cost) * this.works[i].num} 円 \n\n`
											
					}
				}

				message = message + `■アポイント${formatter.format(this.count)}件 \n\n` +
									`■アポイントの根拠 \n` 

				for (const [key, value] of Object.entries(this.checkboxItems)) {
					if(value !== false){
						message =  message + `${value}\n`
					}
				}
				
				message =  message + `\n ■SNS` 

				for (let i=0; i<this.socials.length;i++){
					message =  message + `\n【${this.socials[i].snsType}】\n` + 
										`アカウント名 ${this.socials[i].accountName} \n` +
										`フォロワー数 ${formatter.format(this.socials[i].follower)} \n` +
										`目標フォロワー数 ${formatter.format(this.socials[i].targetFollower)} \n`
										
				}

				message =  message + ` \n ■紹介営業・関係構築 \n`

				for (let i=0; i<this.connections.length;i++){
					message =  message + `${this.connections[i].introduce} \n` 
									
				}

				message =  message + `\n ■今月の課題 \n` 

				for (let i=0; i<this.connections.length;i++){
					message =  message +`${this.tasks[i].name} \n` 
										
				}

				const date = `${this.datetime.year}_${this.datetime.month}`
				const goal = {}
				goal[date] = {
					categorys:this.categorys,
					count:this.count,
					checkboxItems:this.checkboxItems,
					socials:this.socials,
					connections:this.connections,
					tasks:this.tasks
				}
				const db = this.$firebase.firestore();
				db.doc("users/" + this.userProfile.userId).set({
					"goal":goal
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
		
		}
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
		
		// .then(async data=>{
		// 	//initializeApp()
		// 	profile = await liff.getProfile()
		// 	const {
		// 		userId,
		// 		displayName,
		// 		pictureUrl,
		// 		statusMessage
		// 	} = profile

		// 	alert(profile)
		// })
		// .catch(err=>{
		// 	console.log(err);
		// 	alert(err)
		// })
	
		// (profile === null ? this.userProfile.userId = "test" : this.userProfile.userId = userId);
			// if (!liff.isLoggedIn()) {
			// 	//liff.login({ redirectUri: "https://bizprison-a9fc9.web.app" });
			// 	this.userProfile.userId = "test"
			// }else{
			// 	initializeApp()
			// 	const profile = await liff.getProfile()
			// 	const {
			// 		userId,
			// 		displayName,
			// 		pictureUrl,
			// 		statusMessage
			// 	} = profile

			// 	this.userProfile.userId = userId
			// 	// alert(userId)
			// 	// alert(displayName)
			// 	// alert(pictureUrl)
			// 	// liff.sendMessages([
			// 	// 	{
			// 	// 		type:'text',
			// 	// 		text:statusMessage
			// 	// 	}
			// 	// ])
			// 	// .then(() => {
			// 	// 	this.userProfile.userId = userId
			// 	// })
			// 	// .catch((err) => {
			// 	// 	alert(err);
			// 	// });
			// }
		// }).bind(this)
		// .catch(err=>{
		// 	console.error(err)
		
		
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