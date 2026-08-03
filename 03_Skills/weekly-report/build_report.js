const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  ImageRun, PageBreak, LevelFormat
} = require('docx');

const PRIMARY="4B1FAF", ACCENT="FF7A00", G="16A34A", A="D97706", R="DC2626";
const TEXT="0F172A", MUT="475569", LIGHT="F0F2F8", LINE="E2E8F0";
const FONT="Calibri";
const CW=9746; // content width DXA

const noBorder={top:{style:BorderStyle.NONE},bottom:{style:BorderStyle.NONE},left:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE}};
const thin=(c=LINE)=>({style:BorderStyle.SINGLE,size:4,color:c});
const cellB={top:thin(),bottom:thin(),left:thin(),right:thin()};

function t(text,{b=false,c=TEXT,sz=22,i=false}={}) {
  return new TextRun({text,bold:b,italics:i,color:c,size:sz,font:FONT});
}
function p(children,opts={}) { return new Paragraph({children:Array.isArray(children)?children:[children],...opts}); }
function label(l,v){ return p([t(l+" ",{b:true,c:PRIMARY}),t(v)],{spacing:{after:80}}); }

function hcell(txt,w){ return new TableCell({width:{size:w,type:WidthType.DXA},shading:{type:ShadingType.CLEAR,fill:PRIMARY,color:"auto"},margins:{top:60,bottom:60,left:100,right:100},children:[p(t(txt,{b:true,c:"FFFFFF",sz:20}))]}); }
function cell(children,w,fill){ return new TableCell({width:{size:w,type:WidthType.DXA},shading:fill?{type:ShadingType.CLEAR,fill,color:"auto"}:undefined,margins:{top:60,bottom:60,left:100,right:100},children:Array.isArray(children)?children:[children]}); }
function ragCell(txt,color,w){ return new TableCell({width:{size:w,type:WidthType.DXA},shading:{type:ShadingType.CLEAR,fill:color,color:"auto"},margins:{top:60,bottom:60,left:100,right:100},children:[p(t(txt,{b:true,c:"FFFFFF",sz:19}),{alignment:AlignmentType.CENTER})]}); }

const cols=[1500,1300,900,2846,2200,1000];
const rows=[
  ["GNOL","Đúng tiến độ",G,"72%","Đang UAT giai đoạn 2 (8/11 luồng)","Go-live 15/08","Không"],
  ["BLOL","Có rủi ro",A,"55%","Chờ tích hợp Cục đấu thầu","Kết nối thử 22/08","Có"],
  ["Đào tạo AI","Đúng tiến độ",G,"60%","Hoàn thành 3/5 buổi","Buổi 4 — 12/08","Không"],
  ["Task số khác","Có rủi ro",A,"48%","2 task chậm do phụ thuộc IT","Release menu 20/08","Không"],
];

const overviewTable=new Table({
  columnWidths:cols,width:{size:CW,type:WidthType.DXA},
  borders:{top:thin(),bottom:thin(),left:thin(),right:thin(),insideHorizontal:thin(),insideVertical:thin()},
  rows:[
    new TableRow({tableHeader:true,children:[
      hcell("Mảng",cols[0]),hcell("Trạng thái",cols[1]),hcell("% HT",cols[2]),
      hcell("Tình hình",cols[3]),hcell("Next milestone",cols[4]),hcell("Cần BLĐ?",cols[5])]}),
    ...rows.map((r,idx)=>new TableRow({children:[
      cell(p(t(r[0],{b:true})),cols[0], idx%2? "FFFFFF":LIGHT),
      ragCell(r[1],r[2],cols[1]),
      cell(p(t(r[3],{b:true}),{alignment:AlignmentType.CENTER}),cols[2], idx%2? "FFFFFF":LIGHT),
      cell(p(t(r[4])),cols[3], idx%2? "FFFFFF":LIGHT),
      cell(p(t(r[5])),cols[4], idx%2? "FFFFFF":LIGHT),
      cell(p(t(r[6],{b:r[6]==="Có",c:r[6]==="Có"?R:MUT}),{alignment:AlignmentType.CENTER}),cols[5], idx%2? "FFFFFF":LIGHT),
    ]}))
  ]
});

// images side by side (borderless layout table)
const imgRow=new Table({
  columnWidths:[5846,3900],width:{size:CW,type:WidthType.DXA},borders:noBorder,
  rows:[new TableRow({children:[
    new TableCell({width:{size:5846,type:WidthType.DXA},borders:noBorder,children:[
      p(t("Tiến độ theo mảng",{b:true,c:MUT,sz:18})),
      p(new ImageRun({type:"png",data:fs.readFileSync("prog_bars.png"),transformation:{width:400,height:150}}))]}),
    new TableCell({width:{size:3900,type:WidthType.DXA},borders:noBorder,children:[
      p(t("Sức khỏe (RAG)",{b:true,c:MUT,sz:18})),
      p(new ImageRun({type:"png",data:fs.readFileSync("rag_donut.png"),transformation:{width:185,height:185}}),{alignment:AlignmentType.CENTER})]}),
  ]})]
});

// highlight box: Cần BLĐ
const bldBox=new Table({
  columnWidths:[CW],width:{size:CW,type:WidthType.DXA},
  borders:{top:thin(ACCENT),bottom:thin(ACCENT),left:{style:BorderStyle.SINGLE,size:24,color:ACCENT},right:thin(ACCENT)},
  rows:[new TableRow({children:[new TableCell({width:{size:CW,type:WidthType.DXA},shading:{type:ShadingType.CLEAR,fill:"FBEEDA",color:"auto"},margins:{top:120,bottom:120,left:160,right:160},children:[
    p([t("⚑ Cần BLĐ quyết tuần này",{b:true,c:"854F0B"})],{spacing:{after:60}}),
    p([t("BLOL — ",{b:true}),t("Duyệt phương án tích hợp dự phòng với Cục đấu thầu để tránh trễ go-live.")]),
  ]})]})]
});

function areaBlock(title,color,statusText,pct,fields){
  const out=[ new Paragraph({heading:HeadingLevel.HEADING_2,spacing:{before:200,after:80},
    children:[t(title+"  ",{b:true,c:PRIMARY,sz:26}),t("● "+statusText+" · "+pct,{b:true,c:color,sz:20})]}) ];
  for(const [l,v] of fields) out.push(label(l,v));
  return out;
}

const bullet=(txt)=>new Paragraph({numbering:{reference:"plan",level:0},children:[t(txt)]});

const doc=new Document({
  numbering:{config:[{reference:"plan",levels:[{level:0,format:LevelFormat.BULLET,text:"•",alignment:AlignmentType.LEFT,style:{run:{color:PRIMARY}}}]}]},
  styles:{default:{document:{run:{font:FONT,size:22,color:TEXT}}},
    paragraphStyles:[
      {id:"Heading1",name:"Heading 1",basedOn:"Normal",next:"Normal",quickFormat:true,run:{font:FONT,size:28,bold:true,color:PRIMARY},paragraph:{spacing:{before:240,after:120}}},
      {id:"Heading2",name:"Heading 2",basedOn:"Normal",next:"Normal",quickFormat:true,run:{font:FONT,size:26,bold:true,color:PRIMARY}},
    ]},
  sections:[{
    properties:{page:{size:{width:11906,height:16838},margin:{top:1080,bottom:1080,left:1080,right:1080}}},
    children:[
      // Title band
      new Table({columnWidths:[CW],width:{size:CW,type:WidthType.DXA},borders:noBorder,rows:[new TableRow({children:[
        new TableCell({width:{size:CW,type:WidthType.DXA},shading:{type:ShadingType.CLEAR,fill:PRIMARY,color:"auto"},margins:{top:160,bottom:160,left:200,right:200},children:[
          p(t("BÁO CÁO TUẦN — TEAM SỐ HÓA TÍN DỤNG",{b:true,c:"FFFFFF",sz:30})),
          p(t("Trung tâm Sản phẩm & Giải pháp Tín dụng · Khối KHDN · TPBank",{c:"E9E4FB",sz:18}),{spacing:{before:40}}),
        ]})]})]}),
      p([t("Kỳ: ",{b:true}),t("Tuần 32/2026 · số liệu đến 18:00 Thứ 6, 07/08/2026    "),t("Người báo cáo: ",{b:true}),t("Trần Thế Tuân    "),t("Nơi nhận: ",{b:true}),t("Giám đốc Trung tâm (cc: đầu mối liên quan)")],{spacing:{before:160,after:120}}),

      new Paragraph({heading:HeadingLevel.HEADING_1,children:[t("1. Tổng quan điều hành",{b:true,c:PRIMARY,sz:28})]}),
      overviewTable,
      p(t(" ",{sz:8})),
      imgRow,
      p(t(" ",{sz:8})),
      bldBox,

      new Paragraph({heading:HeadingLevel.HEADING_1,spacing:{before:280},children:[t("2. Chi tiết theo mảng",{b:true,c:PRIMARY,sz:28})]}),
      ...areaBlock("GNOL — Giải ngân online",("#"+G).slice(1)?G:G,"Đúng tiến độ","72%",[
        ["Tổng quan:","Giải ngân online cho KHDN trên nền TPBank BIZ."],
        ["Đang ở đâu:","Đang UAT giai đoạn 2, đã xong 8/11 luồng nghiệp vụ."],
        ["Vướng mắc:","Chưa có vướng mắc lớn."],
        ["Next milestone:","Go-live phân hệ giải ngân theo hạn mức — 15/08/2026."],
      ]),
      ...areaBlock("BLOL — Bảo lãnh online",A,"Có rủi ro","55%",[
        ["Tổng quan:","Bảo lãnh online, gồm nhánh bảo lãnh điện tử kết nối Cục đấu thầu."],
        ["Đang ở đâu:","Luồng nội bộ sẵn sàng; chờ phản hồi kỹ thuật tích hợp từ Cục đấu thầu."],
        ["Vướng mắc:","Phụ thuộc lịch tích hợp bên thứ ba → rủi ro trễ go-live."],
        ["Next milestone:","Kết nối thử nghiệm với Cục đấu thầu — 22/08/2026."],
      ]),
      ...areaBlock("Đào tạo AI",G,"Đúng tiến độ","60%",[
        ["Tổng quan:","Chương trình nâng năng lực AI cho trung tâm."],
        ["Đang ở đâu:","Hoàn thành 3/5 buổi; bước đầu áp dụng vào công việc."],
        ["Vướng mắc:","Cần thêm case thực hành theo nghiệp vụ tín dụng."],
        ["Next milestone:","Buổi 4 — Prompting nâng cao — 12/08/2026."],
      ]),
      ...areaBlock("Task số khác",A,"Có rủi ro","48%",[
        ["Tổng quan:","Menu tín dụng TPBank BIZ, SCF, BPM và các task vận hành."],
        ["Đang ở đâu:","6/13 task đang chạy; 2 task chậm."],
        ["Vướng mắc:","2 task chậm do phụ thuộc nguồn lực IT."],
        ["Next milestone:","Release cập nhật menu tín dụng — 20/08/2026."],
      ]),

      new Paragraph({heading:HeadingLevel.HEADING_1,spacing:{before:280},children:[t("3. Kế hoạch tuần tới",{b:true,c:PRIMARY,sz:28})]}),
      bullet("GNOL: hoàn tất UAT 3 luồng còn lại; chuẩn bị go-live."),
      bullet("BLOL: chốt lịch tích hợp Cục đấu thầu; trình BLĐ phương án dự phòng."),
      bullet("Đào tạo AI: tổ chức buổi 4; thu thập sáng kiến AI từ học viên."),
      bullet("Task số khác: đẩy 2 task chậm; release cập nhật menu tín dụng."),

      p(t("— Số liệu trong file là dữ liệu MINH HỌA để duyệt bố cục; sẽ thay bằng số thật từ hệ thống khi chạy chính thức. —",{i:true,c:MUT,sz:18}),{spacing:{before:280},alignment:AlignmentType.CENTER}),
    ]
  }]
});

Packer.toBuffer(doc).then(b=>{fs.writeFileSync("Bao_cao_tuan_MAU.docx",b);console.log("DOCX OK",b.length);});
