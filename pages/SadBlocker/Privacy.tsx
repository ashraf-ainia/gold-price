import Head from "next/head";
import Link from "next/link";
import React from "react";

const Privacy = () => {
  return (
    <div>
      <Head>
        <title>سياسة الخصوصية</title>
      </Head>
      <div style={{ textAlign: "center", direction: "rtl" }}>
        <h1>سياسة الخصوصية</h1>

        <p>
          نحن نهتم بخصوصيتك، ونرغب في أن تكون متأكدًا من أنك تفهم كيف نقوم بجمع
          واستخدام وحماية معلوماتك.
        </p>

        <h2>عدم حفظ بيانات المستخدم</h2>

        <p>
          نود أن نؤكد لك أننا لا نقوم بحفظ أي من معلومات المستخدم الخاصة بك. نحن
          نحترم خصوصيتك ونلتزم بتوفير تجربة استخدام آمنة وخصوصية.
        </p>

        <p>
          إذا كان لديك أي أسئلة إضافية أو استفسارات حول سياسة الخصوصية، يرجى .
          <Link href="/SadBlocker/ContactUs" style={{ color: "blue" }}>
            التواصل معنا
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Privacy;
