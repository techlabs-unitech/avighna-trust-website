/** Builds the PDF a visitor downloads after confirming a planned-trip request. Runs in the browser only. */

export type TripSummary = {
  reference: string;
  submittedOn: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  age: string;
  gender: string;
  elders: string;
  kids: string;
  days: string;
  places: string[];
  travelGuide: string;
  travelMode: string;
  darshanType: string;
};

export async function downloadTripPdf(t: TripSummary): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 48;
  let y = 0;

  // header band
  doc.setFillColor(74, 15, 15);
  doc.rect(0, 0, W, 92, "F");
  doc.setFillColor(227, 161, 28);
  doc.rect(0, 92, W, 4, "F");
  doc.setTextColor(255, 247, 224);
  doc.setFont("times", "bold");
  doc.setFontSize(24);
  doc.text("Avighna Trust · Vedavani Pathashala", M, 44);
  doc.setFont("times", "normal");
  doc.setFontSize(13);
  doc.text("Planned Trip Request — Confirmation", M, 68);
  y = 128;

  doc.setTextColor(43, 29, 20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Reference: ${t.reference}`, M, y);
  doc.setFont("helvetica", "normal");
  doc.text(`Submitted on: ${t.submittedOn}`, W - M, y, { align: "right" });
  y += 12;
  doc.setDrawColor(227, 161, 28);
  doc.line(M, y, W - M, y);
  y += 26;

  const ensure = (need: number) => {
    if (y + need > H - 70) {
      doc.addPage();
      y = M;
    }
  };
  const heading = (text: string) => {
    ensure(40);
    doc.setFont("times", "bold");
    doc.setFontSize(15);
    doc.setTextColor(143, 23, 23);
    doc.text(text, M, y);
    y += 8;
    doc.setDrawColor(220, 200, 150);
    doc.line(M, y, W - M, y);
    y += 18;
  };
  const row = (label: string, value: string) => {
    const lines = doc.splitTextToSize(value || "—", W - M * 2 - 150) as string[];
    ensure(lines.length * 15 + 6);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(29, 36, 87);
    doc.text(label, M, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(43, 29, 20);
    doc.text(lines, M + 150, y);
    y += lines.length * 15 + 4;
  };

  heading("Contact information");
  row("Name", t.name);
  row("Phone", t.phone);
  row("Email", t.email);
  row("Address", t.address);
  y += 8;
  heading("Travellers");
  row("Age", t.age);
  row("Gender", t.gender);
  row("Number of elders", t.elders);
  row("Number of kids", t.kids);
  row("Number of days", t.days);
  y += 8;
  heading("Travelling places");
  row("Places", t.places.join(", "));
  y += 8;
  heading("Travel preferences");
  row("Travel guide needed", t.travelGuide);
  row("Travel mode", t.travelMode);
  row("Type of darshan", t.darshanType);
  y += 8;
  heading("Payment");
  row("Status", "Pending — online payment will be available soon. No payment has been taken.");
  y += 10;

  ensure(60);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(106, 82, 54);
  const note = doc.splitTextToSize(
    "Thank you for your request. The Trust's office will review it and contact you with an itinerary, dates and costs. Please keep this reference number for all communication.",
    W - M * 2,
  ) as string[];
  doc.text(note, M, y);

  // footer on every page
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(120, 100, 80);
    doc.text("Avighna Trust · Vedavani Pathashala · Page " + i + " of " + pages, W / 2, H - 28, { align: "center" });
  }

  doc.save(`planned-trip-${t.reference}.pdf`);
}
