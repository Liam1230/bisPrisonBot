const functions = require('firebase-functions');
const line = require('@line/bot-sdk');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const axios = require('axios');
admin.initializeApp();
const firestore = admin.firestore();
const fs = require('fs');
const { Buffer } = require('buffer');

exports.saveMessageObject = functions.https.onRequest(async(request, response) => {
	await cors(request, response, async() =>{
		const body = request.body;
		const json = body.json;
		const objName = body.objName;
		const target = body.target;
		var tmp = {}
		tmp[objName] = json

		var res = await firestore.doc("messages/" + target).set(tmp,{merge:true});

		response.status(200).send(res);
	})
})
exports.loadMessageObject = functions.https.onRequest(async(request, response) => {
	await cors(request, response, async() =>{
		const body = request.body;
		const objName = body.objName;
		const target = body.target;

		var res = await firestore.doc("messages/" + target).get();
		var data = res.data();
		var json = data[objName]

		response.status(200).send(json);
	})
})

exports.creatRichMenu = functions.https.onRequest(async(request, response) => {
	await cors(request, response, async() =>{
		const client = new line.Client({
			channelAccessToken: "JF7ih96WB4Tfz3MutekMj3LnMmadn0zLdfttCQtm38AFJ6Si1Vec+qypCvHMCNj74VTa+3CXdQquFpUL1ijmNJ2LgZEN9LSzsvlNqZ8eoApPIRbjhjpaN0EhYHAG2DO5n4yt1PFnbm8jhAqecqAKdQdB04t89/1O/w1cDnyilFU=",
			channelSecret:"d850f126efd1d3f49e6f52727dd7e35e"
		})

		const richmenu = {
			size: {
			  width: 1200,
			  height: 810
			},
			selected: false,
			name: "richmenuShow",
			chatBarText: "メニュー表示",
			areas: [
				{
					bounds: {
						x: 197,
						y: 237,
						width: 268,
						height: 268
					},
					action: {
						type:"uri",
   						uri:"https://liff.line.me/1654259536-9QolwByP"
					}
				},
				{
					bounds: {
						x: 197,
						y: 506,
						width: 268,
						height: 268
					},
					action: {
						type:"uri",
   						uri:"https://liff.line.me/1654259536-2xMyYEz0"
					}
				},
				{
					bounds: {
						x: 776,
						y: 237,
						width: 268,
						height: 268
					},
					action: {
						type:"uri",
   						uri:"https://liff.line.me/1654259536-81GaYZ20"
					}
				},
				{
					bounds: {
						x: 466,
						y: 237,
						width: 268,
						height: 268
					},
					action: {
						type:"uri",
   						uri:"https://liff.line.me/1654259536-WdOEYoBX"
					}
				},
				
			]
		}

		client.createRichMenu(richmenu).then(async(richMenuId) =>{
			console.log(richMenuId)
			const imgUrl = 'https://firebasestorage.googleapis.com/v0/b/bizprison-a9fc9.appspot.com/o/bizMenu.png?alt=media&token=93e426c4-a6c3-4bc2-8522-ef2c6b02ad1c'
			const {data} = await axios.get(imgUrl,{responseType:"arraybuffer"})
			const tmpfilePath = "/tmp/tmp.png"
			fs.writeFileSync(tmpfilePath, new Buffer.from(data),'binary')
			await client.setRichMenuImage(richMenuId, fs.createReadStream(tmpfilePath))
			await client.setDefaultRichMenu(richMenuId)
			fs.unlinkSync(tmpfilePath)
		}).catch(err=>{
			console.error(err);
			response.status(400).send(err);
		})

		response.status(200).send('OK');
		  
	})
})

exports.line = functions.runWith({ memory: "2GB", timeoutSeconds: 540 }).https.onRequest(async(request, response) => {
	const client = new line.Client({
		channelAccessToken: "JF7ih96WB4Tfz3MutekMj3LnMmadn0zLdfttCQtm38AFJ6Si1Vec+qypCvHMCNj74VTa+3CXdQquFpUL1ijmNJ2LgZEN9LSzsvlNqZ8eoApPIRbjhjpaN0EhYHAG2DO5n4yt1PFnbm8jhAqecqAKdQdB04t89/1O/w1cDnyilFU=",
		channelSecret:"d850f126efd1d3f49e6f52727dd7e35e"
	})

    const body = request.body;
	const events = body.events;
	console.log(body);
	console.log(events);

	const messageDoc = await firestore.doc("messages/template").get()
    var messages = messageDoc.data();
    
	await Promise.all(events
		.filter(event => event.type === 'follow')
		.map(async event => {
			await firestore.doc('users/'+event.source.userId).set({
				state:0,
			},{merge:true})
		})
	)

	var userinfo = null;
	if(events.filter(event => event.type !== 'follow').length){
		await firestore.doc('users/' + events[0].source.userId).get()
		.then(doc=>{
			userinfo = doc.data();
		})
	}
	
	for(let event of events){
		const{
			replyToken,
			type,
			source:{

				
				userId
			},
			message,
			postback
		} = event
		if(type == "follow"){
            client.replyMessage(replyToken,messages.followMessage).then(res=>{
                console.log(res)
                response.status(200).send('OK');
            }).catch(err=>{
                console.error(err);
                response.status(400).send(err);
            })
        }
        if(type == "message"){
			if(message.type == "text"){
				let split = message.text.split(":")
				const mode = split[0]
				const command = split[1]
				if(message.text == "モード選択:行動計画"){
					client.replyMessage(replyToken,messages.test2).then(res=>{
						console.log(res)
						response.status(200).send('OK');
					}).catch(err=>{
						console.error(err);
						response.status(400).send(err);
					})
				}
				if(message.text == "モード選択:ワーク"){}
				if(message.text == "モード選択:アポレポート"){
					client.replyMessage(replyToken,messages.apoReport).then(res=>{
						console.log(res)
						response.status(200).send('OK');
					}).catch(err=>{
						console.error(err);
						response.status(400).send(err);
					})
				}
				if(message.text == "モード選択:受注レポート"){
					client.replyMessage(replyToken,messages.test2).then(res=>{
						console.log(res)
						response.status(200).send('OK');
					}).catch(err=>{
						console.error(err);
						response.status(400).send(err);
					})
				}
				if(message.text == "モード選択:案件一覧"){}
				if(message.text == "モード選択:メンバー紹介"){}
				if(mode == "アポレポート1"){
					await client.replyMessage(replyToken,messages.apoReport2)
					response.status(200).send('OK');
				}
				if(userinfo.state == "ar_place"){
					await firestore.doc('users/'+event.source.userId).set({

						
						apoPlace: message.text,
						state: "ar_cost"
					},{merge:true})
				}
			}
		}
		if(type=="postback"){
			if(postback.data=="apoStartTime"){
				await firestore.doc('users/'+event.source.userId).set({
					apoStartTime: postback.params.datetime
				},{merge:true})
				await client.replyMessage(replyToken,messages.apoReport3)
				response.status(200).send('OK');
			}
			if(postback.data=="apoEndTime"){
				await firestore.doc('users/'+event.source.userId).set({
					apoEndTime: postback.params.datetime,
					state: "ar_place"
				},{merge:true})
				await client.replyMessage(replyToken,messages.apoReport4)
				response.status(200).send('OK');
			}
		}
    }
})