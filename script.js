// ============================
// ELEMENT
// ============================

const tanggal = document.getElementById("tanggal");
const nama = document.getElementById("nama");
const posisi = document.getElementById("posisi");
const kendalaList = document.getElementById("kendalaList");
const tindakList = document.getElementById("tindakList");

const addKendala = document.getElementById("addKendala");
const addTindak = document.getElementById("addTindak");

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

function tambahItem(container, placeholder = "Tulis...") {

    const div = document.createElement("div");

    div.className = "list-item";

    div.innerHTML = `
        <input type="text" placeholder="${placeholder}">
        <button class="deleteBtn">✖</button>
    `;

    const input = div.querySelector("input");

    // Hapus item
    div.querySelector(".deleteBtn").onclick = () => {
        div.remove();
    };

    // Tekan Enter = tambah item baru
    input.addEventListener("keydown", function(e){

        if(e.key === "Enter"){

            e.preventDefault();

            tambahItem(container, placeholder);

            const inputs = container.querySelectorAll("input");
            inputs[inputs.length - 1].focus();

        }

    });

    container.appendChild(div);

}

addCheck.onclick = ()=>tambahItem(checkList, "Tulis pekerjaan...");
addPlan.onclick = ()=>tambahItem(planList, "Tulis rencana...");
addKendala.onclick = ()=>tambahItem(kendalaList, "Tulis kendala...");
addTindak.onclick = ()=>tambahItem(tindakList, "Tulis tindak lanjut...");

// item pertama

tambahItem(kendalaList, "Tulis kendala...");
tambahItem(tindakList, "Tulis tindak lanjut...");
tambahItem(checkList, "Tulis pekerjaan...");
tambahItem(planList, "Tulis rencana...");

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

function formatNumbering(text) {
    return text
        .split("\n")
        .filter(item => item.trim() !== "")
        .map((item, index) => `${index + 1}. ${item}`)
        .join("\n");
}

generateBtn.onclick = () => {

    const pekerjaan = [...checkList.querySelectorAll("input")];
    const rencana = [...planList.querySelectorAll("input")];

    const posisiText = posisi.value.trim() || "HR REKRUITMEN";

    let hasil = "";
    hasil += `📋 *CEK OUT ${posisiText.toUpperCase()}*\n`;
    hasil += `Tanggal : ${formatTanggal(tanggal.value)}\n`;
    hasil += `Nama : ${nama.value}\n`;
    hasil += `━━━━━━━━━━━━━━━━━━\n`;
    hasil += `━━━━━━━━━━━━━━━━━━\n`;
    hasil += `📝 *CATATAN ${posisiText.toUpperCase()}*\n`;
    hasil += `━━━━━━━━━━━━━━━━━━\n`;

    hasil += `- Kendala Hari Ini :\n`;
    const kendala = [...kendalaList.querySelectorAll("input")];
    kendala.forEach((item,index)=>{
    if(item.value.trim()!=""){
        hasil += `${index+1}. ${item.value}\n`;
        }
    });

    hasil += `\n- Tindak Lanjut :\n`;
    const tindak = [...tindakList.querySelectorAll("input")];
    tindak.forEach((item,index)=>{
    if(item.value.trim()!=""){
      hasil += `${index+1}. ${item.value}\n`;
        }
    });

    hasil += `\n- Check Out Pekerjaan :\n`;

    pekerjaan.forEach((item,index)=>{

        if(item.value.trim()!=""){

            hasil += `${index+1}. ${item.value}\n`;

        }

    });

    hasil += `\n- Rencana Pekerjaan Besok :\n`;

    rencana.forEach((item,index)=>{

        if(item.value.trim()!=""){

            hasil += `${index+1}. ${item.value}\n`;

        }

    });

    hasil += `\n━━━━━━━━━━━━━━━━━━\n`;
    hasil += `✅️ *TERIMAKASIH*\n`;
    hasil += `━━━━━━━━━━━━━━━━━━`;

    output.value = hasil;

};

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
    kendalaList.innerHTML="";
    tindakList.innerHTML="";
    tambahItem(kendalaList);
    tambahItem(tindakList);
    
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
