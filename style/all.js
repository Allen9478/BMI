var datalist = JSON.parse(localStorage.getItem('bmiList')) || [];
var btn = document.querySelector('.btn');
var height = document.getElementById('textheight');
var weight = document.getElementById('textweight');
var delself = document.getElementById('delSelf');
var delAll = document.getElementById('delAll');
var main = document.querySelector('.main');
var list = document.querySelector('.list');
var listText = document.querySelector('.main h3');
btn.addEventListener('click',answer);
list.addEventListener('click',delone);
delAll.addEventListener('click',delall);
updateList(datalist);

function answer(e){
    var bmiValue = (weight.value/(height.value*0.01)**2).toFixed(2);
    //toFixed(x)是取小數後第x為止的用法
    var spanWarning = document.querySelector('.warning');
    var btnGroup = document.querySelector('.btn-another');  
if(height.value>0 && weight.value>0){
    if((bmiValue<18.5 && bmiValue>0)){
        bmiRange='過輕';
        bmiBg='bg-g';
        bmiColor='#86D73F';
        btn.classList.add('d-none');
        spanWarning.classList.add('d-none');
    }else if((bmiValue<=24 && bmiValue>=18.5)){
        bmiRange='正常';
        bmiBg='bg-b';
        bmiColor='#31BAF9';
        btn.classList.add('d-none');
        spanWarning.classList.add('d-none');
    }else if(bmiValue>24){
        bmiRange='過重';
        bmiBg='bg-y';
        bmiColor='#FF982D';
        btn.classList.add('d-none');
        spanWarning.classList.add('d-none');
    }else if(height.value == '' || weight.value == '' ){
        spanWarning.classList.remove('d-none');
        return;
    }else if(height.value == 0 || weight.value == 0){
        spanWarning.classList.remove('d-none');
        return;
    }
        var str ='<div style="color:'+bmiColor+'" class="btnanswer"><em>' + bmiValue + '</em><p>BMI</p><h3>' + bmiRange + '</h3><a class="back ' + bmiBg + '" href="#"><img src="assets/icons_loop.png"></a></div>';
        btnGroup.innerHTML= str;
        btnGroup.classList.remove('d-none');
        height.readOnly=true;
        weight.readOnly=true;
        var infor ={
            range : bmiRange,
            bmi : bmiValue,
            height :height.value,
            weight :weight.value,
            color: bmiColor,
            date: new Date().toLocaleDateString()
        };
        delAll.classList.remove('d-none');
        listText.classList.add('d-none');
        datalist.push(infor);
        updateList(datalist);
        localStorage.setItem('bmilist',JSON.stringify(datalist));
        var back = document.querySelector('.back');
        back.addEventListener('click', function newbmi(n){ 
            var btnA = document.querySelector('.btnanswer');
            var text = document.querySelector('.text');
            btnGroup.classList.add('d-none'); 
            btn.classList.remove('d-none');
            height.readOnly=false;
            weight.readOnly=false;
            height.value='';
            weight.value='';
            },false);
             
        }else{
            spanWarning.classList.remove('d-none');
        }
}
function updateList(e) {
    str = '';
    var len = e.length;
    for (var i = 0; len > i; i++) {
      str += '<li style="border-left:6px solid '+e[i].color +'"><p>'+e[i].range +'</p><p><span>BMI</span>'+e[i].bmi +'</p><p><span>weight</span>'+e[i].weight +'kg</p><p><span>height</span>'+e[i].height +'cm</p><p>'+e[i].date+'</p><button id="delSelf" data-self='+i+'>刪除</button></li>';
    }
    list.innerHTML = str;
}
function delone(e){
    if (e.target.nodeName !== 'BUTTON') {return};
    
    var cel = e.target.dataset.self;
    datalist.splice(cel,1);
    if(datalist.length == 0){
        listText.classList.remove('d-none');
        delAll.classList.add('d-none');
    };
    localStorage.setItem('bmilist',JSON.stringify(datalist));
    updateList(datalist);
}
function delall(item){
    if (item.target.nodeName !== 'INPUT') {return};
    delAll.classList.add('d-none');
    list.innerHTML='<h3>目前還沒有您的資料,請點選上方計算你的BMI</h3>';
    let len = datalist.length;
    datalist.splice(0,len);
    localStorage.setItem('bmilist',JSON.stringify(datalist));
    updateList(datalist);

    // 要問六角老師為何用clear之後新增新資料會連之前已刪除的資料一起增加
    // localStorage.clear();
    // updateList(datalist);
}