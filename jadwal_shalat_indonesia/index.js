let time =  document.getElementById('date');
var now = new Date();
var l = 0;
var month;
setInterval(() => {
    switch(now.getMonth()){
        case 0:
            month = "01";
            break;
        case 1:
            month = "02";
            break;
        case 2:
            month =  "03";
            break;
        case 3: 
            month = "04";
            break;
        case 4:
            month = "05";
            break;
        case 5:
            month = "06";
            break;
        case 6:
            month = "07";
            break;
        case 7:
            month = "08";
            break;
        case 8:
            month = "09";
            break;
        case 9:
            month = "10";
            break;
        case 10:
            month = "11";
            break;
        case 11:
            month = "12";
            break;
    }
    l += 1
    formatDate(month)
}, 1000);
        
function formatDate(month){
    var now = new Date();
    let second = now.getSeconds();
    let minutes = now.getMinutes();
    let hour = now.getHours();
    let formatTime = ("0" + hour).substr(-2) + ":" + ("0" + minutes).substr(-2) + ":" + ("0" + second).substr(-2)
    let timeNow = `${now.getFullYear()}-${month}-${now.getDate()}`;
    time.innerHTML = `${timeNow}  ${formatTime}`
}
(function getAllRegion(){
    let td = ""
    return fetch('https://jadwal-shalat-api.herokuapp.com/cities')
        .then(response => response.json())
        .then(m => {
            for(let i = 0; i <= m.data.length; i++){
                setTimeout(()=>{
                    let date = document.getElementById("date").innerText.slice(0,10)
                    fetch(`https://jadwal-shalat-api.herokuapp.com/daily?date=${date}&cityId=${i}`)
                        .then(response => response.json())
                        .then(m => {
                            let region = `${m.data.region}`.split(" ");
                            td += `<tr class="d-block">
                                    <td style="width: 15.3%;">${i}</td>
                                    <td style="width: 35.5%;" >${region[2]}</td>
                                    <td style="width: 13.7%;">${m.data.data[0]['time']}</td>
                                    <td style="width: 13.3%;">${m.data.data[1]['time']}</td>
                                    <td style="width: 13.5%;">${m.data.data[2]['time']}</td>
                                    <td style="width: 13.5%;">${m.data.data[3]['time']}</td>
                                    <td style="width: 13.3%;">${m.data.data[4]['time']}</td>
                                </tr>`;
                            document.getElementsByTagName("tbody")[0].innerHTML = td;
                            if(document.getElementsByTagName("tr").length == 308){
                                document.getElementsByTagName("button")[0].disabled = false;
                                alert("data finished displaying")
                            }
                        })
                },500)
            }
        })
})()
if(document.getElementsByTagName("tbody")[0].contains(document.getElementsByTagName("tr")[0]) == false){
    document.getElementsByTagName("button")[0].disabled = true;
}
document.getElementById("button-addon2").addEventListener("click", function(){
    const input = document.getElementById("cityName").value.toLowerCase();
    for(let i = 0; i < document.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length; i++){
        if(input.indexOf(document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[1].innerHTML.toLowerCase()) > -1){
            document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].setAttribute('class','d-block');
        }else{
            document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].setAttribute('class','d-none');
        }
    }
})