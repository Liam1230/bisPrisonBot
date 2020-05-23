<template>
	<div>
		<v-img src="v.png"></v-img>
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