export default function CautionSection() {
  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div
          style={{
            backgroundColor: "#FFFDE7",
            border: "2px solid #D32F2F",
            borderRadius: "10px",
            padding: "24px 28px",
          }}
        >
          <h2
            style={{
              color: "#D32F2F",
              fontWeight: "800",
              fontSize: "1.4rem",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ⚠️ सावधानियाँ और निर्देश (Caution &amp; Directions)
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <li style={{ fontSize: "1rem", color: "#333", lineHeight: "1.6" }}>
              <strong>🚫 External Use Only:</strong> यह दवा केवल बाहरी उपयोग के
              लिए है। इसे आँख, नाक या मुँह के संपर्क से बचाएं।
            </li>
            <li style={{ fontSize: "1rem", color: "#333", lineHeight: "1.6" }}>
              <strong>🛡️ Patch Test:</strong> संवेदनशील त्वचा वाले व्यक्ति पहले एक छोटे
              हिस्से पर लगाकर जांच लें।
            </li>
            <li style={{ fontSize: "1rem", color: "#333", lineHeight: "1.6" }}>
              <strong>👶 Keep Away from Children:</strong> बच्चों की पहुँच से दूर रखें।
            </li>
            <li style={{ fontSize: "1rem", color: "#333", lineHeight: "1.6" }}>
              <strong>🌡️ Storage:</strong> सीधी धूप से बचाएं और ठंडी, सूखी जगह पर रखें।
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
