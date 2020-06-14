<template>
	<div>
		<h1 align="center" class="white-text">行動計画</h1>
		<v-card outlined style="padding: 10px">
			<h3 align="center">
				売上・利益目標
			</h3>
			<v-form>
				<v-container>
					<template v-for="(work,idx) in works">
						<v-row :key="idx">
							<v-col cols="2" md="2">
								<v-btn color="primary" fab x-small dark @click="onRemoveButton(idx)">
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
							<v-btn color="error" fab x-small dark @click="onAddButton()">
								<v-icon>mdi-plus</v-icon>
							</v-btn>
						</v-layout>
					</v-row>
				</v-container>
			</v-form>
		</v-card>
		<v-card outlined class="pt-5 mt-5">
			<h3 align="center">
				アポイント根拠
			</h3>
			<v-container>
				<v-row>
					<v-col cols="4" md="4" style="padding:0px">
						<v-checkbox
							v-model="checkboxItems.sns" 
							label="SNS" 
							color="red" 
							hide-details
							class="pl-3 ml-3 text-caption"
							true-value="1"
							false-value="0"
						></v-checkbox>
					</v-col>
					<v-col cols="4" md="4" style="padding:0px">
						<v-checkbox 
							v-model="checkboxItems.web" 
							label="Web" 
							color="red darken-3" 
							hide-details
							class="pl-3 ml-3"
							true-value="1"
							false-value="0"
						></v-checkbox>
					</v-col>
					<v-col cols="4" md="4" style="padding:0px">
						<v-checkbox
							v-model="checkboxItems"
							label="知り合い"
							color="indigo"
							value="2"
							hide-details
							class="pl-3 ml-3"
							true-value="1"
							false-value="0"
						></v-checkbox>
					</v-col>
				</v-row>	
				<v-row>
					<v-col cols="4" md="4" style="padding:0px">
						<v-checkbox
							v-model="checkboxItems"
							label="紹介"
							color="indigo darken-3"
							value="3"
							hide-details
							class="pl-3 ml-3"
							true-value="1"
							false-value="0"
						></v-checkbox>
					</v-col>
					<v-col cols="4" md="4" style="padding:0px">
						<v-checkbox
							v-model="checkboxItems"
							label="交流会"
							color="orange"
							value="4"
							hide-details
							class="pl-3 ml-3"
							true-value="1"
							false-value="0"
						></v-checkbox>
					</v-col>
					<v-col cols="4" md="4" style="padding:0px;">
						<v-checkbox
							v-model="checkboxItems"
							label="セミナー"
							color="orange darken-3"
							value="5"
							hide-details
							class="pl-3 ml-3"
							true-value="1"
							false-value="0"
						></v-checkbox>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="4" md="4" style="padding:0px">
						<v-checkbox
							v-model="checkboxItems"
							label="仲介サイト"
							color="indigo darken-3"
							value="3"
							hide-details
							class="pl-3 ml-3"
							true-value="1"
							false-value="0"
						></v-checkbox>
					</v-col>
					<v-col cols="4" md="4" style="padding:0px">
					</v-col>
					<v-col cols="4" md="4" style="padding:0px;">
					</v-col>
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
		formData: {
			name: ''
		},
		checkboxItems:{
			sns: false,
			web: false,
			friend: false,
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
		selectItems:[0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100],
	}),
	filters: {
		moneyFilter(val){
			console.log(val.toLocaleString())
			return val.toLocaleString();
		}
	},
	methods:{
		onRemoveButton(idx){
			this.works.splice(idx,1)
		},
		onAddButton(){
			this.works.push({
				name:"new",
				price:0,
				cost:0,
				num:0,
				cvr:0
			})
		},
		submit(){
			//TODO: テキストをデータからいい感じに作成		
			var subject = "行動計画:"	
			var subject2 = "アポイント:"
			var textMessage
			for (var i=0; i<this.works.length;i++){
				
				textMessage = this.works[i].name + "," + this.works[i].price + "," + this.works[i].cost + "," + this.works[i].num + "," + this.works[i].cvr
				alert(textMessage);
			}

			
			alert(this.checkboxItems);
			

			
			
			// liff.sendMessages([
			// 	{
			// 		type:'text',
			// 		text:statusMessage
			// 	}
			// ])
			// .then(() => {
			// 	alert('message sent');
			// })
			// .catch((err) => {
			// 	alert(err);
			// });
		}
	},
	mounted: async()=>{
		// liff.init({
		// 	liffId:"1654259536-9QolwByP"
		// })
		// .then(async data=>{
		// 	if (!liff.isLoggedIn()) {
		// 		liff.login();
		// 	}else{
		// 		const profile = await liff.getProfile()
		// 		const {
		// 			userId,
		// 			displayName,
		// 			pictureUrl,
		// 			statusMessage
		// 		} = profile
		// 		alert(userId)
		// 		alert(displayName)
		// 		alert(pictureUrl)
		// 		liff.sendMessages([
		// 			{
		// 				type:'text',
		// 				text:statusMessage
		// 			}
		// 		])
		// 		.then(() => {
		// 			alert('message sent');
		// 		})
		// 		.catch((err) => {
		// 			alert(err);
		// 		});
		// 	}
		// }).bind(this)
		// .catch(err=>{
		// 	console.error(err)
		// })
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