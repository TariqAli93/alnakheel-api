import Excel from "exceljs";
import dayjs from "dayjs";

export async function exportPropertiesToExcel(properties, res) {
  const wb = new Excel.Workbook();
  wb.created = new Date();

  // ورقة RTL + تثبيت الصفّين (العنوان + الهيدر)
  const ws = wb.addWorksheet("العقارات", {
    views: [{ state: "frozen", ySplit: 2, rightToLeft: true }],
    properties: { tabColor: { argb: "FF2E86C1" } },
    pageSetup: { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 }
  });

  // الأعمدة (لاحظ createdAt)
  const columns = [
    { header: "الاسم", key: "name", width: 25 },
    { header: "جنس العقار", key: "kind", width: 12 },
    { header: "نوع العقار", key: "type", width: 14 },
    { header: "العنوان", key: "address", width: 42 },
    { header: "السعر", key: "price", width: 16, style: { numFmt: "#,##0" } },
    { header: "المساحة (م²)", key: "area", width: 14, style: { numFmt: "#,##0" } },
    { header: "عدد الطوابق", key: "floors", width: 12 },
    { header: "عدد الغرف", key: "rooms", width: 12 },
    { header: "عدد الحمامات", key: "bathrooms", width: 14 },
    { header: "الحالة", key: "status", width: 14 },
    { header: "تاريخ الإدخال", key: "createdAt", width: 22 }
  ];
  ws.columns = columns;

  // عنوان علوي جميل (صف 1) مع دمج خلايا
  const title = `تقرير العقارات — ${dayjs().format("YYYY/MM/DD HH:mm")}`;
  ws.insertRow(1, [title]);
  ws.mergeCells(1, 1, 1, columns.length);
  const titleCell = ws.getCell(1, 1);
  titleCell.font = { name: "Segoe UI", size: 16, bold: true };
  titleCell.alignment = { horizontal: "center", vertical: "middle" };
  titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFEAF2FB" } };
  ws.getRow(1).height = 26;

  // الهيدر (صار الآن في الصف 2 لأننا أضفنا عنوان في الصف 1)
  const headerRow = ws.getRow(2);
  headerRow.font = { name: "Segoe UI", bold: true, color: { argb: "FFFFFFFF" } };
  headerRow.alignment = { horizontal: "center", vertical: "middle" };
  headerRow.height = 22;
  headerRow.eachCell((cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1F4E79" } };
    cell.border = {
      top: { style: "thin", color: { argb: "FFBCCCE0" } },
      left: { style: "thin", color: { argb: "FFBCCCE0" } },
      bottom: { style: "thin", color: { argb: "FFBCCCE0" } },
      right: { style: "thin", color: { argb: "FFBCCCE0" } }
    };
  });

  const propertyStatus = {
    available: "متاح",
    sold: "مباع",
    reserved: "محجوز",
    underConstruction: "تحت الإنشاء",
    notAvailable: "غير متاح"
  };

  const toNumber = (v) => (typeof v === "number" ? v : Number(String(v ?? "").replace(/[^\d.-]/g, "")) || null);

  // البيانات (تبدأ من الصف 3)
  for (const p of properties) {
    ws.addRow({
      name: p.name ?? "",
      type: p.type ?? "",
      kind: p.kind ?? "",
      address: [p.province, p.district, p.neighborhood, p.street].filter(Boolean).join(" / "),
      price: toNumber(p.price),
      area: toNumber(p.area),
      floors: p.floors ?? "",
      rooms: p.rooms ?? "",
      bathrooms: p.bathrooms ?? "",
      status: propertyStatus[p.status] || "غير محدد",
      createdAt: p.createdAt ? dayjs(p.createdAt).format("YYYY-MM-DD HH:mm") : ""
    });
  }

  // تظبيط الشكل العام للصفوف + زيبرا + حدود خفيفة + محاذاة يمين وتغليف نص
  const lastRowNum = ws.lastRow?.number ?? 2;
  for (let r = 3; r <= lastRowNum; r++) {
    const row = ws.getRow(r);
    row.alignment = { horizontal: "right", vertical: "middle", wrapText: true };
    row.height = 18;

    // Zebra striping
    if (r % 2 === 1) {
      row.eachCell((cell) => {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF7F9FC" } };
      });
    }

    // حدود خفيفة
    row.eachCell((cell) => {
      cell.border = {
        left: { style: "thin", color: { argb: "FFE5E7EB" } },
        right: { style: "thin", color: { argb: "FFE5E7EB" } },
        bottom: { style: "thin", color: { argb: "FFE5E7EB" } }
      };
    });

    // تلوين الحالة بحسب القيمة
    const statusCell = row.getCell("status");
    const v = String(statusCell.value ?? "");
    if (v.includes("متاح")) {
      statusCell.font = { bold: true, color: { argb: "FF0F5132" } };
      statusCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD1E7DD" } };
    } else if (v.includes("مباع")) {
      statusCell.font = { bold: true, color: { argb: "FF842029" } };
      statusCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF8D7DA" } };
    } else if (v.includes("محجوز")) {
      statusCell.font = { bold: true, color: { argb: "FF664D03" } };
      statusCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFCEFC7" } };
    } else if (v.includes("تحت الإنشاء")) {
      statusCell.font = { bold: true, color: { argb: "FF084298" } };
      statusCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDCE6F8" } };
    }
  }

  // فلتر على الهيدر (الصف 2) لكل الأعمدة
  ws.autoFilter = { from: { row: 2, column: 1 }, to: { row: 2, column: columns.length } };

  // تأكيد تنسيقات الأعمدة الرقمية
  ws.getColumn("price").numFmt = "#,##0";
  ws.getColumn("area").numFmt = "#,##0";

  // إخراج الملف
  const buffer = await wb.xlsx.writeBuffer();
  const filename = `properties-${dayjs().format("YYYY-MM-DD_HH-mm")}.xlsx`;

  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-Length", buffer.length);
  res.end(Buffer.from(buffer));
}
