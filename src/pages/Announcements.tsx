import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone } from "lucide-react";

export default function Announcements() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Megaphone className="h-8 w-8 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                Important Announcements
              </h1>
            </div>
            <p className="text-muted-foreground">
              Official announcements for new AAU students - 2018 E.C. (2025/26 Academic Year)
            </p>
          </div>

          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="text-xl">
                የአዲስ አበባ ዩኒቨርሲቲ ለ2018 ዓ.ም አዲስ ተማሪዎች መግለጫ
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <div className="text-foreground leading-relaxed space-y-4">
                <p>
                  ለ2018 ዓ.ም አዲስ አበባ ዩኒቨርሲቲ የመግቢያ ማስገቢያ ነጥብ በአንድ በኩል ኢትዮጵያ ውስጥ ተማሪዎች መደበኛ ትምህርት እንዲማሩ ካለው 
                  ትልቅ ፍላጎት እና በሌላ በኩል ዩኒቨርሲቲው ያለው አቅም በሚፈቅደው መጠን በተደራጀ መንገድ የተቀመጠ መሆኑን ለማሳወቅ እንወዳለን።
                </p>

                <h3 className="text-lg font-semibold text-primary mt-6">📋 ለራስ ወጪ ተማሪዎች</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>በሁሉም መርሃግብሮች የስተማሪ መቀበያ ቦታዎች ተዘጋጅተዋል</li>
                  <li>የመግቢያ ነጥብ መስፈርቶች በመርሃግብር ይለያያሉ</li>
                  <li>መመዝገቢያ ሂደቱ በኦንላይን ይከናወናል</li>
                </ul>

                <h3 className="text-lg font-semibold text-primary mt-6">🎓 ለመንግስት ስፖንሰር ተማሪዎች</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>በትምህርት ሚኒስቴር የሚመደቡ ተማሪዎች ብቻ</li>
                  <li>የመግቢያ ነጥብ በፆታ እና በውጤት ይለያያል</li>
                  <li>ለተፈጥሮ ሳይንስ እና ማህበራዊ ሳይንስ የተለያዩ ፕሮግራሞች አሉ</li>
                </ul>

                <h3 className="text-lg font-semibold text-primary mt-6">⚠️ አስፈላጊ ማስታወሻዎች</h3>
                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>የመግቢያ ነጥብ ስሌት: (ማትሪክ/420) × 60 + (UAT/160) × 40</li>
                    <li>ተማሪዎች እስከ 3 የመርሃግብር ምርጫዎችን መምረጥ ይችላሉ</li>
                    <li>የመመዝገቢያ የጊዜ ገደብ በቅርቡ ይገለጻል</li>
                    <li>ለበለጠ መረጃ ዩኒቨርሲቲውን ድህረ ገጽ ይጎብኙ</li>
                  </ul>
                </div>

                <h3 className="text-lg font-semibold text-primary mt-6">📞 የመገናኛ መረጃ</h3>
                <div className="space-y-2">
                  <p><strong>አድራሻ:</strong> አዲስ አበባ ዩኒቨርሲቲ, ዋና ካምፓስ</p>
                  <p><strong>ስልክ:</strong> +251-11-123-4567</p>
                  <p><strong>ኢሜይል:</strong> admissions@aau.edu.et</p>
                  <p><strong>ድረ-ገጽ:</strong> www.aau.edu.et</p>
                </div>

                <div className="mt-6 p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                  <p className="text-sm">
                    <strong>🎯 ለስኬታማ መመዝገቢያ:</strong> እባክዎን ሁሉንም የግል ሰነዶችዎን ያዘጋጁ እና 
                    በመመዝገቢያ ጊዜ መሰረት ማስገቢያውን ያጠናቅቁ። በተጨማሪም የመግቢያ ነጥቡን በዚህ መተግበሪያ በመጠቀም 
                    ቅድሚያ ማረጋገጥ ይችላሉ።
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="text-lg">English Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                Addis Ababa University welcomes new students for the 2018 E.C. (2025/26) academic year. 
                Admission is based on a weighted score calculated from Matriculation (Grade 12) and 
                University Aptitude Test (UAT) results.
              </p>
              <p>
                <strong>Key Points:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Score Calculation: (Matric/420) × 60 + (UAT/160) × 40</li>
                <li>Students can select up to 3 department preferences</li>
                <li>Different cut-offs for Self-Sponsored and Government-Sponsored students</li>
                <li>Registration deadlines will be announced soon</li>
              </ul>
              <p className="text-muted-foreground italic">
                For detailed information in Amharic, please refer to the announcement above.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
