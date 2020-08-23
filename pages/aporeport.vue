<template>
	<div>
		<h1 align="center" class="white-text">アポレポート</h1>

		<v-card outlined style="padding: 10px">
		<h3 align="center">
			年月日
		</h3>
			<v-container>
				<template>
					<v-row>
						<v-col cols="4" md="4">
							<v-select :items="years" label="年" v-model="datetime.year"></v-select>
						</v-col>
						<v-col cols="4" md="4">
							<v-select :items="months" label="月" v-model="datetime.month"></v-select>
						</v-col>
						<v-col cols="4" md="4">
							<v-select :items="dates" label="日" v-model="datetime.date"></v-select>
						</v-col>
					</v-row>
				</template>
			</v-container>
		</v-card>

		<v-card outlined class="pt-5 mt-5">
			<h3 align="center">
				アポイント
			</h3>
		</v-card>
		
		<template v-for="(category,idx) in categorys">	
			<v-card class="mb-3" :key="idx">
				<v-row :key="idx" align-content="center" justify="center">
					<v-col cols="1" md="1">
						<v-btn color="primary" fab x-small dark @click="onRemoveCategoryButton(idx)">
							<v-icon>mdi-minus</v-icon>
						</v-btn>
					</v-col>
					<v-col cols="11" md="10">
						<v-text-field
							v-model="category.companyname"
							label="訪問先名"
						></v-text-field>
					</v-col>

					<v-col cols="2" md="2">
					</v-col>
					<v-col cols="2" md="2">
						<v-select :items="times" label="時" v-model="category.timefrom"></v-select>
					</v-col>
					<v-col cols="2" md="2">
						<v-select :items="minutes" label="分" v-model="category.minutefrom"></v-select>
					</v-col>
					<v-col cols="1" md="1" >〜</v-col>
					<v-col cols="2" md="2">
						<v-select :items="times" label="時" v-model="category.timeto"></v-select>
					</v-col>
					<v-col cols="2" md="2">
						<v-select :items="minutes" label="分" v-model="category.minuteto"></v-select>
					</v-col>
				
					<v-col cols="2" md="2">
					</v-col>
					<v-col cols="5" md="5">
						<v-text-field
							v-model="category.place"
							label="場所"
						></v-text-field>
					</v-col>
					<v-col cols="4" md="4">
						<v-select :items="ordertypeSelect" label="状況" v-model="category.ordertype"></v-select>
					</v-col>
					
					<v-container>
						<template v-for="(cost,idx2) in category.costs">
							<v-row :key="idx2+'cost'">
								<v-col cols="1" md="1">
								</v-col>
								<v-col cols="1" md="1">
									<v-btn color="primary" fab x-small dark @click="onRemoveCostButton(idx,idx2)">
										<v-icon>mdi-minus</v-icon>
									</v-btn>
								</v-col>
								<v-col cols="5" md="5">
									<v-text-field
										v-model="cost.name"
										label="費目"
									></v-text-field>
								</v-col>
								<v-col cols="4" md="4">
									<v-text-field
										v-model="cost.price"
										label="費用"
										type="number"
									></v-text-field>
								</v-col>
							</v-row>
							<!--
							<v-divider :key="'hr-'+idx2"></v-divider>
							-->
						</template>
						<v-row> 
							<v-layout justify-center style="padding: 10px">
								<v-btn color="error" fab x-small dark @click="onAddCostButton(idx)">
									<v-icon>mdi-plus</v-icon>
								</v-btn>
							</v-layout>
						</v-row>

						<template v-for="(sale,idx3) in category.sales">
							<v-row :key="idx3+'sale'">
								<v-col cols="1" md="1">
								</v-col>
								<v-col cols="1" md="1">
									<v-btn color="primary" fab x-small dark @click="onRemoveSaleButton(idx,idx3)">
										<v-icon>mdi-minus</v-icon>
									</v-btn>
								</v-col>
								<v-col cols="5" md="5">
									<v-text-field
										v-model="sale.product"
										label="製品"
									></v-text-field>
								</v-col>
								<v-col cols="4" md="4">
									<v-text-field
										v-model="sale.price"
										label="売上"
										type="number"
									></v-text-field>
								</v-col>
							</v-row>
							<!--
							<v-divider :key="'hr-'+idx3"></v-divider>
							-->
						</template>
						<v-row> 
							<v-layout justify-center style="padding: 10px">
								<v-btn color="error" fab x-small dark @click="onAddSaleButton(idx)">
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
				companyname:"",
				ordertype:"",
				timefrom:"",
				minutefrom:"",
				timeto:"",
				miniteto:"",
				place:"",
				costs:[
					{
						name:"",
						price:0,
					}
				],
				sales:[
					{
						product:"",
						price:0,
					}
				]
			}
		],
	
		datetime:{
			year:null,
			month:null,
			date:null
		},
		ordertypeSelect:["受注","失注","検討"],
		selectItemsCategoryname:["自由入力"],
		selectItemsWorksname:["自由入力"],
		times:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
		minutes:[0,5,10,15,20,25,30,35,40,45,50,55],
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
		onRemoveCostButton(idx,idx2){
			this.categorys[idx].costs.splice(idx2,1)
		},
		onRemoveSaleButton(idx,idx3){
			this.categorys[idx].sales.splice(idx3,1)
		},
		onRemoveCategoryButton(idx){
			this.categorys.splice(idx,1)
		},
		onAddCostButton(idx){
			this.categorys[idx].costs.push({
				name:"",
				price:0,
			})
		},
		onAddSaleButton(idx){
			this.categorys[idx].sales.push({
				product:"",
				price:0,
			})
		},
		
		onAddCategoryButton(){
			this.categorys.push({
				companyname:"",
				ordertype:"",
				timefrom:"",
				minutefrom:"",
				timeto:"",
				miniteto:"",
				place:"",
				costs:[
					{
						name:"",
						price:0,
					}
				],
				sales:[
					{
						product:"",
						price:0,
					}
				]
			})
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
			liffId:"1654259536-XY8BvwZ1"
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
		
		
		for (let i=0; i<100;i++){
			this.years.push(2019 + i)
		}

		for (let j=1; j<13;j++){
			this.months.push(j)
		}

		for (let k=1; k<32;k++){
			this.dates.push(k)
		}

		let hiduke =new Date();
		hiduke.setMonth( hiduke.getMonth()+ 1);
		this.datetime.year = hiduke.getFullYear();
		this.datetime.month = hiduke.getMonth();
		this.datetime.date = hiduke.getDate();	
		
		
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