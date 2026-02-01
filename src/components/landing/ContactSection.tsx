"use client";

import { Send, Mail, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

const ContactSection = () => {
	const t = useTranslations("contact");

	return (
		<section id="contact" className="py-16 md:py-24 px-4">
			<div className="container max-w-3xl mx-auto">
				{/* Section heading */}
				<div className="text-center mb-12">
					<h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 rotate-slight-right inline-block">
						{t("title")}
					</h2>
					<p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
						{t("subtitle")}
					</p>
				</div>

				{/* Contact cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{/* Telegram */}
					<a
						href="https://t.me/intbleem"
						target="_blank"
						rel="noopener noreferrer"
						className="group block"
					>
						<div className="p-6 md:p-8 bg-background border-2 border-foreground shadow-hard wobbly-border hover:shadow-hard-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 rotate-slight-left hover:rotate-0">
							<div className="flex items-center gap-4 mb-4">
								<div className="w-14 h-14 bg-[#0088cc] border-2 border-foreground shadow-hard-sm wobbly-border-sm flex items-center justify-center group-hover:animate-wiggle">
									<Send className="w-7 h-7 text-white" />
								</div>
								<div>
									<h3 className="font-heading text-xl font-bold">{t("telegram.title")}</h3>
									<p className="font-body text-muted-foreground">{t("telegram.subtitle")}</p>
								</div>
							</div>
							<div className="flex items-center gap-2 font-body text-lg">
								<MessageCircle className="w-5 h-5 text-primary" />
								<span className="text-foreground font-medium">@intbleem</span>
							</div>
							<Button
								variant="outline"
								className="mt-4 w-full border-2 border-foreground wobbly-border-sm shadow-hard-sm hover:shadow-hard-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
							>
								{t("telegram.button")}
							</Button>
						</div>
					</a>

					{/* Email */}
					<a href="mailto:intbleem@gmail.com" className="group block">
						<div className="p-6 md:p-8 bg-background border-2 border-foreground shadow-hard wobbly-border-alt hover:shadow-hard-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 rotate-slight-right hover:rotate-0">
							<div className="flex items-center gap-4 mb-4">
								<div className="w-14 h-14 bg-secondary border-2 border-foreground shadow-hard-sm wobbly-border-sm flex items-center justify-center group-hover:animate-wiggle">
									<Mail className="w-7 h-7 text-white" />
								</div>
								<div>
									<h3 className="font-heading text-xl font-bold">{t("email.title")}</h3>
									<p className="font-body text-muted-foreground">{t("email.subtitle")}</p>
								</div>
							</div>
							<div className="flex items-center gap-2 font-body text-lg">
								<Mail className="w-5 h-5 text-primary" />
								<span className="text-foreground font-medium">intbleem@gmail.com</span>
							</div>
							<Button
								variant="outline"
								className="mt-4 w-full border-2 border-foreground wobbly-border-sm shadow-hard-sm hover:shadow-hard-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
							>
								{t("email.button")}
							</Button>
						</div>
					</a>
				</div>

				{/* Additional note */}
				<div className="mt-8 text-center">
					<p className="font-body text-muted-foreground">
						{t("tip")}
					</p>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
