import { 
  FileText, 
  FileSpreadsheet, 
  Presentation, 
  Image, 
  Type,
  FileType,
  Columns,
  Layers, 
  Brain, 
  Zap, 
  Shield,
  GraduationCap,
  Scale,
  Store,
  Briefcase,
  Wrench,
  BookOpen,
  Globe
} from "lucide-react";
import TranslationCases from "./TranslationCases";

const TrustStrip = () => {
  // 为什么选择我们
  const features = [
    { 
      icon: Layers, 
      title: "高级格式支持", 
      desc: "完整保留文档排版、表格、图片位置",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30"
    },
    { 
      icon: Brain, 
      title: "智能语境适应", 
      desc: "根据上下文智能选择最佳翻译表达",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/30"
    },
    { 
      icon: Globe, 
      title: "多语言支持", 
      desc: "支持数十种语言互译，覆盖全球主流语种",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30"
    },
    { 
      icon: BookOpen, 
      title: "术语一致性", 
      desc: "确保专业术语翻译统一，支持自定义术语表",
      color: "text-foreground",
      bgColor: "bg-foreground/10",
      borderColor: "border-foreground/30"
    },
    { 
      icon: Zap, 
      title: "高准确率", 
      desc: "AI 驱动的翻译引擎，确保翻译质量",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30"
    },
    { 
      icon: Shield, 
      title: "隐私保护", 
      desc: "SSL加密传输，翻译后立即删除文件",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/30"
    },
  ];

  // 谁在使用我们
  const users = [
    { icon: GraduationCap, title: "教育机构", desc: "学校、培训机构、在线教育平台" },
    { icon: Scale, title: "法律与企业", desc: "律所、跨国公司、合规部门" },
    { icon: Store, title: "小企业主", desc: "外贸商家、跨境电商、初创企业" },
    { icon: Briefcase, title: "自由职业者", desc: "翻译员、顾问、远程工作者" },
  ];

  // 相关工具
  const tools = [
    { icon: FileText, name: "PDF 翻译", color: "text-primary" },
    { icon: Presentation, name: "PPT 翻译", color: "text-accent" },
    { icon: FileSpreadsheet, name: "Excel 翻译", color: "text-secondary" },
    { icon: Type, name: "文本翻译", color: "text-foreground" },
    { icon: Image, name: "图片翻译", color: "text-primary" },
  ];

  // 支持的文档格式
  const formats = [
    { icon: FileText, name: "PDF 文档", desc: "保留原始页面布局、字体样式和图片位置，适合合同、报告、论文等正式文档的翻译", color: "text-primary" },
    { icon: FileSpreadsheet, name: "Word 文档", desc: "完整保留表格结构、段落格式和文本样式，翻译后可直接编辑修改", color: "text-secondary" },
    { icon: Presentation, name: "PPT 演示文稿", desc: "保持幻灯片布局、图文排版和动画设置，适合商务演示和教学材料", color: "text-accent" },
  ];

  // 使用场景
  const scenarios = [
    { icon: Briefcase, title: "商务文档", desc: "合同、提案、商业计划书等需要保持专业格式的文件" },
    { icon: GraduationCap, title: "学术研究", desc: "外文论文、研究报告、学术期刊，保留引用格式和图表" },
    { icon: Wrench, title: "技术资料", desc: "产品手册、技术规格书、API 文档等专业技术内容" },
    { icon: BookOpen, title: "教育培训", desc: "教材、课件、培训资料，保持原有的教学结构" },
    { icon: Globe, title: "跨国协作", desc: "快速翻译团队共享文档，促进国际团队沟通" },
  ];

  // 用户评价
  const testimonialsRow1 = [
    { text: "终于有一个翻译工具不会把我的表格弄乱了！", author: "李小明", role: "产品经理", gradient: "from-primary/30 to-secondary/30" },
    { text: "翻译质量很高，格式保留得非常好。", author: "王芳", role: "市场专员", gradient: "from-secondary/30 to-accent/30" },
    { text: "PPT翻译后直接就能用，太方便了！", author: "张伟", role: "自由译者", gradient: "from-accent/30 to-primary/30" },
    { text: "节省了大量重新排版的时间，强烈推荐！", author: "陈静", role: "项目经理", gradient: "from-primary/40 to-accent/20" },
  ];

  const testimonialsRow2 = [
    { text: "合同翻译保留了所有格式，客户很满意。", author: "刘洋", role: "商务总监", gradient: "from-secondary/40 to-primary/20" },
    { text: "学术论文翻译后引用格式完全正确。", author: "赵敏", role: "研究员", gradient: "from-accent/40 to-secondary/20" },
    { text: "比其他工具快很多，而且准确度高。", author: "孙浩", role: "技术主管", gradient: "from-primary/20 to-secondary/40" },
    { text: "产品手册翻译效果超出预期！", author: "周琳", role: "文档工程师", gradient: "from-secondary/20 to-accent/40" },
  ];

  const TestimonialCard = ({ text, author, role, gradient }: { text: string; author: string; role: string; gradient: string }) => (
    <div className="flex-shrink-0 w-72 bg-card border-2 border-foreground/15 p-4 wobbly-border-sm flex gap-3 group hover:border-foreground/25 transition-colors">
      <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${gradient} border-2 border-foreground/20 wobbly-border-sm flex items-center justify-center`}>
        <span className="font-heading text-sm text-foreground">{author.slice(0, 1)}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">
          "{text}"
        </p>
        <p className="font-body text-xs text-foreground/70 mt-2">
          {author} · {role}
        </p>
      </div>
    </div>
  );

  const SectionDivider = ({ color = "primary" }: { color?: string }) => (
    <div className="flex items-center justify-center gap-3 mb-20">
      <div className="h-px w-16 bg-foreground/15" />
      <div className={`w-2 h-2 bg-${color}/30 wobbly-border-sm`} />
      <div className="h-px w-16 bg-foreground/15" />
    </div>
  );

  return (
    <section className="w-full max-w-4xl mx-auto mt-16 px-4 pb-12">
      <div className="border-t-2 border-foreground/15 pt-16">
        
        {/* 为什么选择我们 */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3">
              为什么选择我们
            </h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto">
              专为文档翻译设计，让您的工作更高效
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card border-2 border-foreground/20 p-6 wobbly-border transition-all hover:border-foreground/30 hover:shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 ${feature.bgColor} border-2 ${feature.borderColor} wobbly-border-sm flex items-center justify-center`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-heading text-lg text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <SectionDivider color="secondary" />

        {/* 翻译案例 */}
        <TranslationCases />

        <SectionDivider color="secondary" />

        {/* 谁在使用我们 */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3">
              谁在使用我们
            </h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto">
              来自各行各业的用户信赖我们的服务
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {users.map((user) => (
              <div
                key={user.title}
                className="bg-muted/30 border-2 border-foreground/15 p-6 wobbly-border-sm text-center transition-all hover:bg-muted/50 hover:border-foreground/25"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-card border-2 border-foreground/20 wobbly-border-sm flex items-center justify-center">
                  <user.icon className="w-7 h-7 text-foreground/70" />
                </div>
                <h3 className="font-heading text-base text-foreground mb-2">
                  {user.title}
                </h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  {user.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <SectionDivider color="secondary" />

        {/* 常见使用场景 */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3">
              常见使用场景
            </h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto">
              多种场景，一个工具全搞定
            </p>
          </div>
          
          <div className="space-y-4">
            {scenarios.map((scenario) => (
              <div
                key={scenario.title}
                className="flex items-start gap-5 bg-muted/20 border-2 border-foreground/10 p-6 wobbly-border-sm transition-colors hover:bg-muted/40 hover:border-foreground/20"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-card border-2 border-foreground/20 wobbly-border-sm flex items-center justify-center">
                  <scenario.icon className="w-6 h-6 text-foreground/70" />
                </div>
                <div className="pt-1">
                  <h3 className="font-heading text-lg text-foreground mb-1">
                    {scenario.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {scenario.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <SectionDivider color="accent" />

        {/* 相关工具 */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3">
              相关翻译工具
            </h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto">
              支持多种文档格式，满足不同场景需求
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-5">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-3 bg-card border-2 border-foreground/20 px-6 py-4 wobbly-border-sm transition-all hover:border-foreground/30 hover:bg-muted/30 hover:shadow-sm cursor-pointer"
              >
                <tool.icon className={`w-5 h-5 ${tool.color}`} />
                <span className="font-body text-sm text-foreground">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        <SectionDivider color="primary" />

        {/* 用户评价 - 多行自动滚动 */}
        <div className="mb-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3">
              用户们怎么说
            </h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto">
              听听使用过我们服务的用户怎么评价
            </p>
          </div>
          
          <div className="space-y-5 overflow-hidden">
            {/* 第一行 - 向左滚动 */}
            <div className="relative">
              <div className="flex gap-5 animate-scroll-left hover:[animation-play-state:paused]">
                {[...testimonialsRow1, ...testimonialsRow1].map((t, i) => (
                  <TestimonialCard key={i} {...t} />
                ))}
              </div>
            </div>
            
            {/* 第二行 - 向右滚动 */}
            <div className="relative">
              <div className="flex gap-5 animate-scroll-right hover:[animation-play-state:paused]">
                {[...testimonialsRow2, ...testimonialsRow2].map((t, i) => (
                  <TestimonialCard key={i} {...t} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustStrip;
