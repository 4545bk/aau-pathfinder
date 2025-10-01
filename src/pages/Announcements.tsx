import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone } from "lucide-react";

export default function Announcements() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Megaphone className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
            <p className="text-muted-foreground">
              Important updates for AAU 2025/26 Academic Year
            </p>
          </div>
        </div>
      </div>

      {/* Main Announcement Card */}
      <Card className="shadow-card">
        <CardHeader className="border-b">
          <CardTitle className="text-xl">
            የአዲስ አበባ ዩኒቨርሲቲ ለ2018 ዓ.ም አዲስ ተማሪዎች መግለጫ
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="text-foreground leading-relaxed space-y-4">
            <p>
              ለ2018 ዓ.ም አዲስ አበባ ዩኒቨርሲቲ የመግቢያ ማስገቢያ ነጥብ በአንድ በኩል ኢትዮጵያ ውስጥ ተማሪዎች መደበኛ ትምህርት እንዲማሩ ካለው 
              ትልቅ ፍላጎት እና በሌላ በኩል ዩኒቨርሲቲው ያለው አቅም በሚፈቅደው መጠን በተደራጀ መንገድ የተቀመጠ መሆኑን ለማሳወቅ እንወዳለን።
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    📋 ለራስ ወጪ ተማሪዎች
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>በሁሉም መርሃግብሮች የስተማሪ መቀበያ ቦታዎች ተዘጋጅተዋል</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>የመግቢያ ነጥብ መስፈርቶች በመርሃግብር ይለያያሉ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>መመዝገቢያ ሂደቱ በኦንላይን ይከናወናል</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-accent/5 border-accent/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    🎓 ለመንግስት ስፖንሰር ተማሪዎች
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>በትምህርት ሚኒስቴር የሚመደቡ ተማሪዎች ብቻ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>የመግቢያ ነጥብ በፆታ እና በውጤት ይለያያል</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>ለተፈጥሮ ሳይንስ እና ማህበራዊ ሳይንስ የተለያዩ ፕሮግራሞች አሉ</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-muted/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">⚠️ አስፈላጊ ማስታወሻዎች</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>የመግቢያ ነጥብ ስሌት: <code className="bg-background px-2 py-0.5 rounded">(ማትሪክ ÷ 12) + (UAT ÷ 2)</code></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>ተማሪዎች እስከ 3 የመርሃግብር ምርጫዎችን መምረጥ ይችላሉ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>የመመዝገቢያ የጊዜ ገደብ በቅርቡ ይገለጻል</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>ለበለጠ መረጃ ዩኒቨርሲቲውን ድህረ ገጽ ይጎብኙ</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">📞 የመገናኛ መረጃ / Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">አድራሻ / Address:</span>
              <span className="font-medium">AAU Main Campus</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">ስልክ / Phone:</span>
              <span className="font-medium">+251-11-123-4567</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">ኢሜይል / Email:</span>
              <span className="font-medium">admissions@aau.edu.et</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">ድረ-ገጽ / Website:</span>
              <span className="font-medium">www.aau.edu.et</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">🎯 Quick Tip</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              <strong>ለስኬታማ መመዝገቢያ:</strong> እባክዎን ሁሉንም የግል ሰነዶችዎን ያዘጋጁ እና 
              በመመዝገቢያ ጊዜ መሰረት ማስገቢያውን ያጠናቅቁ።
            </p>
            <p>
              <strong>For successful registration:</strong> Please prepare all your personal documents 
              and use this calculator to verify your eligibility beforehand.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* English Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">English Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            Addis Ababa University welcomes new students for the 2018 E.C. (2025/26) academic year. 
            Admission is based on a weighted score calculated from Matriculation (Grade 12) and 
            University Aptitude Test (UAT) results.
          </p>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="font-semibold mb-2">Key Points:</p>
            <ul className="space-y-1 ml-4">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Score Calculation: (Matric ÷ 12) + (UAT ÷ 2)</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Students can select up to 3 department preferences</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Different cut-offs for Self-Sponsored and Government-Sponsored students</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Registration deadlines will be announced soon</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
