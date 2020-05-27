<template>
	<div>
		<h1 align="center" color="blue">行動計画</h1>
		<v-sheet color="orange lighten-2" height="560px">
			<v-card outlined  style="padding: 10px">
				<h3 align="center">
					売上・利益目標
				</h3>
				<v-form v-model="valid">
					<v-container>
						<v-row>
							<v-col cols="12" md="3">
								<v-text-field
									v-model="anken"
									label="案件名"
								></v-text-field>
							</v-col>

							<v-col cols="12" md="3">
								<v-text-field
									v-model="uriage"
									label="売上"
									type="number"
								></v-text-field>
							</v-col>

							<v-col cols="12" md="3">
								<v-text-field
									v-model="hiyou"
									label="費用"
									type="number"
								></v-text-field>
							</v-col>

							<v-col cols="12" md="3">
								<v-text-field
									v-model="juchu"
									label="受注数"
									type="number"
								></v-text-field>
							</v-col>
						</v-row>
					</v-container>
				</v-form>
			</v-card>

			<v-card outlined  style="padding: 10px">
				<h3 align="center">
					アポイント根拠
				</h3>
				<v-container>
					<v-row>
						<v-col cols="12" sm="4" md="4">
							<v-checkbox
							v-model="ex4"
							label="SNS"
							color="red"
							value="0"
							hide-details
							></v-checkbox>
							<v-checkbox
							v-model="ex4"
							label="Web"
							color="red darken-3"
							value="1"
							hide-details
							></v-checkbox>
						</v-col>
						<v-col cols="12" sm="4" md="4">
							<v-checkbox
							v-model="ex4"
							label="知り合い"
							color="indigo"
							value="2"
							hide-details
							></v-checkbox>
							<v-checkbox
							v-model="ex4"
							label="紹介"
							color="indigo darken-3"
							value="3"
							hide-details
							></v-checkbox>
						</v-col>
						<v-col cols="12" sm="4" md="4">
							<v-checkbox
							v-model="ex4"
							label="交流会"
							color="orange"
							value="4"
							hide-details
							></v-checkbox>
							<v-checkbox
							v-model="ex4"
							label="セミナー"
							color="orange darken-3"
							value="5"
							hide-details
							></v-checkbox>
						</v-col>
					</v-row>
				</v-container>
			</v-card>

		</v-sheet>
		<div>
			{{lineId}}
		</div>
	</div>
</template>

<script>
export default {
	data:()=>({
		formData: {
			name: ''
		},
		lineId: null
	}),
	mounted: async()=>{
		liff.init({
			liffId:"1654259536-9QolwByP"
		})
		.then(async data=>{
			if (!liff.isLoggedIn()) {
				liff.login();
			}else{
				const profile = await liff.getProfile()
				const {
					userId,
					displayName,
					pictureUrl,
					statusMessage
				} = profile
				alert(userId)
				alert(displayName)
				alert(pictureUrl)
				liff.sendMessages([
					{
						type:'text',
						text:statusMessage
					}
				])
				.then(() => {
					alert('message sent');
				})
				.catch((err) => {
					alert(err);
				});
			}
		}).bind(this)
		.catch(err=>{
			console.error(err)
		})
	}
}
</script>