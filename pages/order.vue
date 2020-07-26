<template>
	<div>
		<h1 align="center" class="white-text">受注レポート</h1>

		<v-card outlined style="padding: 10px">
		<h3 align="center">
			年月日
		</h3>
			<v-container>
				<template>
					<v-row>
						<v-col cols="4" md="4">
							<v-select :items="years" label="年" v-model="datetime.year" @change="onChangeInput(datetime.year,datetime.month)"></v-select>
						</v-col>
						<v-col cols="4" md="4">
							<v-select :items="months" label="月" v-model="datetime.month" @change="onChangeInput(datetime.year,datetime.month)"></v-select>
						</v-col>
						<v-col cols="4" md="4">
							<v-select :items="dates" label="日" v-model="datetime.date" @change="onChangeInput(datetime.year,datetime.month)"></v-select>
						</v-col>
					</v-row>
				</template>
			</v-container>
		</v-card>

		<v-card outlined class="pt-5 mt-5">
			<h3 align="center">
				受注
			</h3>
		</v-card>
		
		<template v-for="(category,idx) in categorys">	
			<v-card class="mb-3" :key="idx">
				<v-row :key="idx">
					<v-col cols="1" md="1">
						<v-btn color="primary" fab x-small dark @click="onRemoveCategoryButton(idx)">
							<v-icon>mdi-minus</v-icon>
						</v-btn>
					</v-col>

					<v-col cols="11" md="10">
						<v-select :items="selectItemsCategoryname" label="カテゴリ名" v-model="category.categorynameselect" ></v-select>
					</v-col>
					<div v-if="work.nameselect === '自由入力'">
						<v-col cols="11" md="10">
							<v-text-field
								v-model="category.categoryname"
								label="カテゴリ名"
							></v-text-field>
						</v-col>
					</div>

					<v-container>
						<template v-for="(work,idx2) in category.works">
							<v-row :key="idx2">
								<v-col cols="1" md="1">
								</v-col>
								<v-col cols="1" md="1">
									<v-btn color="primary" fab x-small dark @click="onRemoveProjectButton(idx,idx2)">
										<v-icon>mdi-minus</v-icon>
									</v-btn>
								</v-col>
								<v-col cols="4" md="3">
									<v-select :items="selectItemsWorksname" label="案件名" v-model="work.nameselect" ></v-select>
								</v-col>
								<div v-if="work.nameselect === '自由入力'">
									<v-col cols="4" md="3">
										<v-text-field
											v-model="work.name"
											label="案件名"
										></v-text-field>
									</v-col>
								</div>
							</v-row>
							<v-row :key="idx2">
								<v-col cols="2" md="2">
								</v-col>
								<v-col cols="3" md="3">
									<v-text-field
										v-model="work.price"
										label="売上"
										type="number"
										@change="onClacProfit(idx,idx2)"
									></v-text-field>
								</v-col>
								<v-col cols="2" md="2">
									<v-text-field
										v-model="work.cost"
										label="原価"
										type="number"
										@change="onClacProfit(idx,idx2)"
									></v-text-field>
								</v-col>
								<v-col cols="2" md="2">
									<v-text-field
										v-model="work.profit"
										label="粗利"
										type="number"
									></v-text-field>
								</v-col>
								<v-col cols="2" md="2">
									<v-text-field
										label="営業利益"
										v-model="work.income"
										type="number"
									></v-text-field>
								</v-col>
							</v-row>
							<v-divider :key="'hr-'+idx2"></v-divider>
						</template>
						<v-row> 
							<v-layout justify-center style="padding: 10px">
								<v-btn color="error" fab x-small dark @click="onAddProjectButton(idx)">
									<v-icon>mdi-plus</v-icon>
								</v-btn>
							</v-layout>
						</v-row>
					</v-container>
				</v-row>
			</v-card>
			<v-divider :key="'hr-'+idx"></v-divider>
		</template>
		<v-row> 
			<v-layout justify-center style="padding: 10px">
				<v-btn color="error" fab x-small dark @click="onAddCategoryButton()">
					<v-icon>mdi-plus</v-icon>
				</v-btn>
			</v-layout>
		</v-row>

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
				categorynameselect:null,
				works:[
					{
						name:"",
						nameselect,
						price:0,
						cost: 0,
						profit: 0,
						income: 0
					},
					{
						name:"",
						nameselect,
						price:0,
						cost: 0,
						profit: 0,
						income: 0
					}
				]
			}
		],
	
		datetime:{
			year:null,
			month:null,
			date:null
		}
		,
		selectItemsCategoryname:["自由入力"],
		selectItemsWorksname:["自由入力"],
		years:[],
		months:[],
		dates:[],
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
		onRemoveCategoryButton(idx){
			this.categorys.splice(idx,1)
		},
		onAddProjectButton(idx){
			this.categorys[idx].works.push({
				name:"",
				nameselect:"",
				price:0,
				cost:0,
				profit:0,
				income:0
			})
		},
		
		onAddCategoryButton(){
			this.categorys.push({
				categoryname:null,
				categorynameselect:null,
				works:[
					{
						name:"",
						nameselect:"",
						price:0,
						cost: 0,
						profit: 0,
						income: 0
					}
				]
			})
		},

		onClacProfit(idx,idx2){
			this.categorys[idx].works[idx2].profit = his.categorys[idx].works[idx2].price - his.categorys[idx].works[idx2].cost
		},

		async onChangeInput(year,month){
			//this.load = true
			const db = this.$firebase.firestore();
			const doc = await db.doc("users/" + this.userProfile.userId).get();
			const data = doc.data()
			console.log(data.goal)
			//this.load = false
			

			// if(`${year}_${month}` in data.goal){
			// 	this.dialog = true
			// }

			const current = data.goal[`${this.datetime.year}_${this.datetime.month}`]
			
			this.categorys.categoryname = current.categorys.categoryname
			this.categorys.works.name = current.categorys.works.name
			

			
		},

		async onDialogYes(){
			//this.load = true
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

			//this.load = false
			//this.dialog = false

		},

		onDialogNo(){
			this.dialog = false
		},

		async submit(){
			//TODO: テキストをデータからいい感じに作成	
			this.load = true
			const formatter = new Intl.NumberFormat('ja-JP');	
			let textMessage
			let toalPrice = 0
			let toalCost = 0
			let toalProfit = 0
			let toalIncome = 0
			let message = `${this.datetime.year}年${this.datetime.month}月${this.datetime.date}日の受注レポート \n\n`

			for (let j=0; j<this.categorys.length;j++){
				for (let i=0; i<this.categorys[j].works.length;i++){
					toalPrice = toalPrice + this.categorys[j].works[i].price
					toalCost = toalCost + this.categorys[j].works[i].cost 
					toalProfit = toalProfit + this.categorys[j].works[i].profit 
					toalIncome = toalIncome + this.categorys[j].works[i].income
				}
			}

			message =  message + `【売上】${formatter.format(toalPrice)}円 \n` + 
								 `【原価】${formatter.format(toalCost)}円 \n` +
								 `【粗利】${formatter.format(toalProfit)}円 \n` +
								 `【営業利益】${formatter.format(toalIncome)}円 \n\n` +
								 `■売上と利益それぞれの内訳 \n\n` 
							
								
			for (let j=0; j<this.categorys.length;j++){
				message =  message +`【${this.categorys[j].categoryname}】\n` 
				
				for (let i=0; i<this.categorys[j].works.length;i++){
					message =  message +`□${this.categorys[j].works[i].name}\n` +
										`売上...${formatter.format(this.categorys[j].works[i].price)}円  \n` +
										`経費...${formatter.format(this.categorys[j].works[i].cost)}円  \n` +
										`粗利...${formatter.format(this.categorys[j].works[i].profit)}円  \n` +
										`営業利益...${formatter.format(this.categorys[j].works[i].income)}円  \n\n` 
										//`営業利益...(${this.works[i].price}円 - ${this.works[i].cost}円) ×  ${this.works[i].num}件 = ${(this.works[i].price - this.works[i].cost) * this.works[i].num} 円 \n\n`
										
				}
			}

			const date = `${this.datetime.year}_${this.datetime.month}_${this.datetime.date}`
			const report = {}
			report[date] = {
				categorys:this.categorys,
			}
			const db = this.$firebase.firestore();
			db.doc("users/" + this.userProfile.userId).set({
				"report":report
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

		for (var k=1; k<32;k++){
			this.dates.push(k)
		}

		var hiduke =new Date();
		hiduke.setMonth( hiduke.getMonth() +1);
		this.datetime.year = hiduke.getFullYear();
		this.datetime.month = hiduke.getMonth();
		this.datetime.month = hiduke.getDate();	
		
		
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