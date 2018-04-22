var XLSX = require('xlsx');
var csvParse = require('csv-parse');
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
var config = require('./config.js');

const localPath = './routes/data/alimama';

async function readAlimama(){
	let results = {};
	await fs.readdir(localPath ,async function(err , files){
		if(err){
	        console.log(err);
	        return;
	    }

	    await files.forEach(async function(filename){

	    	var filedir = await path.join(localPath,filename);

	    	await fs.stat(filedir ,async function(err, stats){
	    		if(err){
			        console.log(err);
			        return;
			    }

			    let workbook =  await XLSX.readFile(filedir);

			    await workbook.SheetNames.forEach(async sheetName => {
			        var csvdatas = await XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
			        await csvParse(csvdatas ,async (err ,output) =>{
			            if(err){
			                console.log('模版格式错误');
			                return
			            }
			            let key = await filename.substring(0 ,filename.indexOf('-'));
			            let obj = await connect(output);
			            results[key] = obj;
			        });
			    });

	    	});
	    });
	});
	setTimeout(async function(){
		writeFiles(results);

	},3000);
}

async function writeFiles(results){
	for (let key in results) {
		(async function(name , datas){
			//let html;
			//if(!~name.indexOf('首页')){
				//html = await fs.readFileSync('./views/pages/team/index.html','utf8');
			//}else{
			let	html = await fs.readFileSync('./views/index.html','utf8');
			//}

			let htmlObj = await ejs.render(html,{
				rootPath: 'https://89team.github.io',
				rootData : datas,
				data: datas[key],
				name: name
			});

			await fs.writeFileSync('../89team.github.io/' + (name == '热门产品' ? 'index' : name) +'.html', htmlObj, (err) => {
			  if (err) throw err;
			  console.log('保存成功');
			});
		})(key , results);
	}
}


function connect(datas ,res){
	let results = [];
    datas.forEach((line ,index)=>{
        if(!index)  return;
        (function(lines){
            results.push(parseData(lines));
        })(line)
    });

    return results; 
}

function parseData(objAary){
	
    let pic = objAary;
    let wkg = {
        auctionId: pic[0],                  //商品id
        title: pic[1],                      //商品名称
        pictUrl: pic[2],                    //商品主图
        auctionUrl: pic[3],                 //商品详情页链接地址
        shopTitle: pic[4],                  //店铺名称
        zkPrice: pic[5],                    //商品价格(单位：元)
        biz30day: pic[6],                   //商品月销量
        tkRate: pic[7],                     //收入比率(%)
        tkCommFee: pic[8],                  //佣金
        nick: pic[9],                       //卖家旺旺

        shortTaokeLinkUrl: pic[10],          //淘宝客短链接(300天内有效)
        taokeLinkUrl: pic[11],               //淘宝客链接
        wash: pic[12],                       //淘口令
        couponTotalCount: pic[13],           //优惠券总量
        couponLeftCount: pic[14],            //优惠券剩余量
        couponInfo: pic[15],                 //优惠券面额
        couponEffectiveStartTime: pic[16],   //优惠券开始时间
        couponEffectiveEndTime: pic[17],     //优惠券结束时间
        couponLinkUrl: pic[18],              //优惠券链接
        couponWash: pic[19],                 //优惠券淘口令(30天内有效)
        shortCouponLinkUrl: pic[20],         //优惠券短链接(300天内有效)
        isMarketing: pic[21],                //是否为营销计划商品
    };
    return wkg;
}

readAlimama();