<template>
	<div>
		<h1 align="center" class="white-text">アポレポート</h1>

		<h3 align="center" class="mt-5 white--text">
			アポイント
		</h3>
		<template v-for="(category,idx) in categorys">	
			<v-card class="mb-3 px-3" :key="idx">
				<v-row :key="idx" align-content="center" justify="center">
					<v-col cols="1" md="1" class="d-flex align-center">
						<v-btn color="primary" fab x-small dark @click="onRemoveCategoryButton(idx)">
							<v-icon>mdi-minus</v-icon>
						</v-btn>
					</v-col>
					<v-col cols="11" md="10">
						<v-text-field
							class="pl-3"
							v-model="category.companyname"
							label="訪問先名"
						></v-text-field>
					</v-col>
					
					<v-col cols="1" md="1"  >
					</v-col>
					<v-col cols="3" md="3"  >
						<v-select :items="years" label="年" v-model="category.year" @change="onChangeInput(category.year,category.month,idx)"></v-select>
					</v-col>
					<v-col cols="3" md="3" >
						<v-select :items="months" label="月" v-model="category.month" @change="onChangeInput(category.year,category.month,idx)"></v-select>
					</v-col>
					<v-col cols="3" md="3">
						<v-select :items="dates" label="日" v-model="category.date"></v-select>
					</v-col>
					<v-col cols="2" md="2">
					</v-col>
				
					<v-col cols="1" md="1">
					</v-col>
					<v-col cols="3" md="3" offset-md="1" >
						<v-select :items="times" label="時" v-model="category.timefrom"></v-select>
					</v-col>
					<v-col cols="3" md="3" offset-md="1">
						<v-select :items="minutes" label="分" v-model="category.minutefrom"></v-select>
					</v-col>
					<v-col cols="1" md="1" class="flex-center" offset-md="1">〜</v-col>
					<v-col cols="4" md="4">
					</v-col>

					<v-col cols="1" md="1">
					</v-col>
					<v-col cols="3" md="3">
						<v-select :items="times" label="時" v-model="category.timeto"></v-select>
					</v-col>
					<v-col cols="3" md="3" >
						<v-select :items="minutes" label="分" v-model="category.minuteto"></v-select>
					</v-col>
					<v-col cols="5" md="5">
					</v-col>
					
					<v-col cols="1" md="1">
					</v-col>
					<v-col cols="7" md="7" offset-md="1">
						<v-text-field
							v-model="category.place"
							label="場所"
						></v-text-field>
					</v-col>
					<v-col cols="4" md="4">
						<v-select :items="ordertypeSelect" label="状況" v-model="category.ordertype"></v-select>
					</v-col>
				
					<v-container>
						<div v-if="category.ordertype === '受注'">
							<template v-for="(sale,idx3) in category.sales" >
								<v-row :key="idx3+'sale'">
									<v-col cols="1" md="1">
									</v-col>
									<v-col cols="1" md="1" class="d-flex align-center">
										<v-btn color="primary" fab x-small dark @click="onRemoveSaleButton(idx,idx3)">
											<v-icon>mdi-minus</v-icon>
										</v-btn>
									</v-col>
									<v-col cols="8" md="8">
										<v-select :items="categorys[idx].selectItemsProductname" label="製品名" v-model="sale.productselect" class="pl-3"></v-select>
									</v-col>
									<v-col cols="2" md="2">
									</v-col>

									<v-col cols="2" md="2" v-if="sale.productselect === '自由入力'">
									</v-col>
									<v-col cols="8" md="8" v-if="sale.productselect === '自由入力'">
										<v-text-field
											v-model="sale.product"
											label="製品名"
										></v-text-field>
									</v-col>
									
								</v-row>
								<v-row :key="idx3+'sale2'">
									<v-col cols="2" md="2">
									</v-col>
									<v-col cols="5" md="5">
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
						</div>
						<template v-for="(cost,idx2) in category.costs">
							<v-row :key="idx2+'cost'">
								<v-col cols="1" md="1">
								</v-col>
								<v-col cols="1" md="1" class="d-flex align-center">
									<v-btn color="primary" fab x-small dark @click="onRemoveCostButton(idx,idx2)">
										<v-icon>mdi-minus</v-icon>
									</v-btn>
								</v-col>
								<v-col cols="6" md="6">
									<v-text-field
										class="pl-3"
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
							<v-layout justify-center>
								<v-btn color="error" small dark @click="onAddCostButton(idx)">
									費用を追加<v-icon>mdi-plus</v-icon>
								</v-btn>
							</v-layout>
						</v-row>
					</v-container>
				</v-row>
			</v-card>
		</template>
		<v-row> 
			<v-layout justify-center>
				<v-btn color="error" small dark @click="onAddCategoryButton()">
					アポイントを追加<v-icon>mdi-plus</v-icon>
				</v-btn>
			</v-layout>
		</v-row>

		<div>
			<v-layout justify-center class="py-5">
				<v-btn align="center" block color="primary" @click="submit()">
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
	
		lineId: null,
		categorys:[
			{
				companyname:"",
				ordertype:"",
				year:"",
				month:"",
				date:"",
				timefrom:"",
				minutefrom:"",
				timeto:"",
				minuteto:"",
				place:"",
				selectItemsProductname:["自由入力"],
				costs:[
					{
						name:"",
						price:0,
					}
				],
				sales:[
					{
						productselect:"",
						product:"",
						price:0,
					}
				],
			}
		],
	
		ordertypeSelect:["受注","失注","検討"],
		selectItemsCategoryname:["自由入力"],
		
		times:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
		minutes:[0,5,10,15,20,25,30,35,40,45,50,55],
		years:[],
		months:[],
		dates:[],
		count:0,
		categorysIndex:0,
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
				year:"",
				month:"",
				date:"",
				timefrom:"",
				minutefrom:"",
				timeto:"",
				miniteto:"",
				place:"",
				selectItemsProductname:["自由入力"],
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

		async onChangeInput(year,month,idx){
		
			const db = this.$firebase.firestore();
			const doc = await db.doc("users/" + this.userProfile.userId).get();
			const data = doc.data()
			console.log(data.goal)

			const current = data.goal[`${this.categorys[idx].year}_${this.categorys[idx].month}`]
			console.log(current)

			if(current != null){
				this.dialog = true
				this.categorysIndex = idx
			}else{
				for (let i=0; i<this.categorys[idx].sales.length;i++){
					this.categorys[idx].sales[i].productselect = "自由入力"
				}
			}
		},

		async onDialogYes(){
			this.load = true

			const db = this.$firebase.firestore();
			const doc = await db.doc("users/" + this.userProfile.userId).get();
			const data = doc.data()
			console.log(data.goal)
			const current = data.goal[`${this.categorys[this.categorysIndex].year}_${this.categorys[this.categorysIndex].month}`]
			console.log(current)

			for (let i=0; i<this.categorys[this.categorysIndex].selectItemsProductname.length;i++){
				if(this.categorys[this.categorysIndex].selectItemsProductname[i] != "自由入力"){
					this.categorys[this.categorysIndex].selectItemsProductname.splice(1,i)
				}
			}
			
			for (let i=0; i<current.categorys.length;i++){

				//this.categorys[i].nameselect = ""

				if(current.categorys[i].categoryname != null){
					this.categorys[this.categorysIndex].selectItemsProductname.push(current.categorys[i].categoryname)
				}

			}

			this.load = false
			this.dialog = false

		},

		onDialogNo(){
			this.dialog = false
		},

		checkSubmit(){
			const errorMessages = []
			const patternText = /^.+$/;
			const patternNumber = /^[1-9]|[1-9][0-9]+$/;
			const patternYear = /^[2][0-9][0-9][0-9]$/;
			const patternMonth = /^[1-9]|[1][0-2]$/;
			const patternDay = /^[1-9]|[1-3][0-9]+$/;
			const patternTime = /^[1-9]|[1-2][0-9]+$/;
			const patternMinute = /^[0-5]|[0-5][0-5]+$/;
			//const result = target.match(pattern)

			for (let j=0; j<this.categorys.length;j++){

				if(!this.categorys[j].companyname){
					errorMessages.push("訪問先名は必須です。")
				}

				if(!this.categorys[j].ordertype){
					errorMessages.push("状況は必須です。")
				}

				if(!this.categorys[j].year){
					errorMessages.push("年は必須です。")
				}

				if(!this.categorys[j].month){
					errorMessages.push("月は必須です。")
				}

				if(!this.categorys[j].date){
					errorMessages.push("日は必須です。")
				}

				if(!this.categorys[j].timefrom){
					errorMessages.push("時は必須です。")
				}

				if(!this.categorys[j].timeto){
					errorMessages.push("時は必須です。")
				}
				
				if(!this.categorys[j].minutefrom){
					errorMessages.push("分は必須です。")
				}

				if(!this.categorys[j].miniteto){
					errorMessages.push("分は必須です。")
				}

				for (let i=0; i<this.categorys[j].sales.length;i++){

					if(!this.categorys[j].sales[i].product){
						errorMessages.push("費目は必須です。")
					}else if(this.categorys[j].sales[i].product.match(patternText) == null){
						errorMessages.push("費目が正しくありません。")
					}

					if(!this.categorys[j].sales[i].price){
						errorMessages.push("費用は必須です。")
					}else if(String(this.categorys[j].sales[i].price).match(patternNumber) == null){
						errorMessages.push("費用が正しくありません。")
					}

				}
			}

			if (errorMessages.length != 0) {
				alert(errorMessages.join('\n'));
				return false;
			}

			return true

		},
		
		async submit(){
			//TODO: テキストをデータからいい感じに作成	
			this.load = true
			const formatter = new Intl.NumberFormat('ja-JP');	
			let textMessage
			let blCheck = await this.checkSubmit()
			if(blCheck == true){
				for (let i=0; i<this.categorys.length;i++){

					let toalPrice = 0
					let toalCost = 0
					let toalProfit = 0
					let toalIncome = 0
					let message = `${this.categorys[i].year}年${this.categorys[i].month}月${this.categorys[i].date}日のアポレポート \n\n`

					for (let j=0; j<this.categorys[i].costs.length;j++){
						toalCost = toalCost + this.categorys[i].costs[j].price 
					}
					
					for (let j=0; j<this.categorys[i].sales.length;j++){
						toalPrice = toalPrice + this.categorys[i].sales[j].price 
					}

					message =  message + `【訪問先】${this.categorys[i].companyname}\n` + 
										`【売上】${formatter.format(toalPrice)}円 \n` + 
										`【費用】${formatter.format(toalCost)}円 \n\n` +
										`■売上と費用それぞれの内訳 \n\n` 
										
					for (let j=0; j<this.categorys[i].costs.length;j++){
						message =  message +　`費目: ${this.categorys[i].costs[j].name} ${formatter.format(this.categorys[i].costs[j].price)}円 \n` 				
					}

					for (let j=0; j<this.categorys[i].sales.length;j++){
						message =  message +　`製品名: ${this.categorys[i].sales[j].product} ${formatter.format(this.categorys[i].sales[j].price)}円 \n` 			
					}

					const date = `${this.categorys[i].year}_${this.categorys[i].month}_${this.categorys[i].date}`
					const aporeport = {}
					aporeport[date] = {
						categorys:this.categorys,
					}
					const db = this.$firebase.firestore();
					db.doc("users/" + this.userProfile.userId).set({
						"aporeport":aporeport
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
			
		}
	},
	mounted: async function(){

		console.log(liff)
		await liff.init({
			liffId:"1654259536-81GaYZ20"
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
		this.categorys.year = hiduke.getFullYear();
		this.categorys.month = hiduke.getMonth();
		this.categorys.date = hiduke.getDate();	
		
		
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
.flex-center{
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>