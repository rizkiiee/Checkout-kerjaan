// ============================
// ELEMENT
// ============================

const tanggal = document.getElementById("tanggal");
const nama = document.getElementById("nama");
const posisi = document.getElementById("posisi");
const kendala = document.getElementById("kendala");
const tindak = document.getElementById("tindak");

const addCheck = document.getElementById("addCheck");
const addPlan = document.getElementById("addPlan");

const checkList = document.getElementById("checkList");
const planList = document.getElementById("planList");

const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const resetBtn = document.getElementById("reset");
const todayBtn = document.getElementById("todayBtn");

const output = document.getElementById("output");

// ============================
// FORMAT TANGGAL
// ============================

function formatTanggal(value){

    if(!value) return "";

    const date = new Date(value);

    return date.toLocaleDateString("id-ID",{
        day:"numeric",
        month:"long",
        year:"numeric"
    });

}

// ============================
// TAMBAH ITEM
// ============================

function tambahItem(container){

    const div = document.createElement("div");

    div.className = "list-item";

    div.innerHTML = `
        <input type="text" placeholder="Tulis pekerjaan...">

        <button class="deleteBtn">✖</button>
    `;

    div.querySelector("button").onclick = () => {

        div.remove();

    };

    container.appendChild(div);

}

addCheck.onclick = ()=>tambahItem(checkList);

addPlan.onclick = ()=>tambahItem(planList);

// item pertama

tambahItem(checkList);

tambahItem(planList);

// ============================
// HARI INI
// ============================

todayBtn.onclick = ()=>{

    const now = new Date();

    tanggal.value = now.toISOString().split("T")[0];

}

// ============================
// GENERATE
// ============================

generateBtn.onclick = ()=>{

    const pekerjaan = [...checkList.querySelectorAll("input")];

    const rencana = [...planList.querySelectorAll("input")];

    let hasil = `📋 *CEK OUT ${posisi.value.toUpperCase()}*
Tanggal : ${formatTanggal(tanggal.value)}
Nama : ${nama.value}
━━━━━━━━━━━━━━━━━━
━━━━━━━━━━━━━━━━━━
📝 *CATATAN ${posisi.value.toUpperCase()}*
━━━━━━━━━━━━━━━━━━
* Kendala Hari Ini :
${kendala.value}
* Tindak Lanjut :
${tindak.value}
- Check Out Pekerjaan :
`;

    pekerjaan.forEach((item,index)=>{

        if(item.value.trim()!=""){

            hasil += `${index+1}. ${item.value}\n`;

        }

    });

    hasil += `
• Rencana Pekerjaan Besok :
`;

    rencana.forEach((item,index)=>{

        if(item.value.trim()!=""){

            hasil += `${index+1}. ${item.value}\n`;

        }

    });

    hasil += `
━━━━━━━━━━━━━━━━━━
✅️ *TERIMAKASIH*
━━━━━━━━━━━━━━━━━━`;

    output.value = hasil;

}

// ============================
// COPY
// ============================

copyBtn.onclick = ()=>{

    if(output.value==""){

        alert("Generate dulu ya 😊");

        return;

    }

    navigator.clipboard.writeText(output.value);

    alert("Berhasil disalin!");

}

// ============================
// RESET
// ============================

resetBtn.onclick = ()=>{

    if(!confirm("Reset semua data?")) return;

    tanggal.value="";
    nama.value="";
    kendala.value="";
    tindak.value="";
    output.value="";

    checkList.innerHTML="";
    planList.innerHTML="";

    tambahItem(checkList);
    tambahItem(planList);

}

nama.addEventListener("input", () => {
    localStorage.setItem("nama", nama.value);
});

posisi.addEventListener("input", () => {
    localStorage.setItem("posisi", posisi.value);
});

window.addEventListener("load", () => {
    nama.value = localStorage.getItem("nama") || "";
    posisi.value = localStorage.getItem("posisi") || "";
});
