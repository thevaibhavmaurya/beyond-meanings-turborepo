import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";
import { Button } from "@repo/ui/components/button";
import { MessageCircle, Mail, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Which browsers does BeyondMeanings support?",
    answer:
      "BeyondMeanings works on all major browsers including Chrome, Firefox, Safari, and Microsoft Edge. We regularly test and update our extension to ensure compatibility with the latest browser versions.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Absolutely. We don't track your searches, store your personal data, or sell information to third parties. Your research queries are processed securely and we don't keep logs of what you search for. Privacy is our top priority.",
  },
  {
    question: "What are the usage limits for the free plan?",
    answer:
      "The free plan includes 15 lookups per day and can be used on 1 device. Free users get access to Wikipedia, dictionary definitions, and basic web search results. Pro users get unlimited lookups and access to all information sources.",
  },
  {
    question: "How do I install the extension?",
    answer:
      "Installation is simple: visit your browser's extension store (Chrome Web Store, Firefox Add-ons, etc.), search for 'BeyondMeanings', and click 'Add to Browser'. The extension will appear in your toolbar and you're ready to start researching!",
  },
  {
    question: "Can I manage my subscription easily?",
    answer:
      "Yes! You can upgrade, downgrade, or cancel your subscription at any time from your account dashboard. Changes take effect immediately and there are no cancellation fees.",
  },
  {
    question: "What's the difference between free and pro features?",
    answer:
      "Free users get essential research tools with daily limits. Pro users get unlimited searches, access to movie/TV databases (TMDB), gaming databases (IGDB), real-time web search, custom shortcuts, priority response times, and advanced AI summaries.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not completely satisfied, contact our support team for a full refund, no questions asked.",
  },
  {
    question: "How fast are the search results?",
    answer:
      "Results typically appear within 1-3 seconds. Pro users get priority response times and faster processing. Our AI-powered system is optimized for speed without compromising on the quality and comprehensiveness of results.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Everything you need to know about BeyondMeanings. Can't find the
            answer you're looking for?
            <span className="text-primary hover:underline cursor-pointer">
              {" "}
              Contact our support team
            </span>
            .
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold hover:text-primary transition-colors py-4 sm:py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-4 sm:pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Support callout */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="mx-auto max-w-2xl rounded-lg bg-muted/50 p-6 sm:p-8 border">
            <div className="mb-4 h-12 w-12 sm:h-16 sm:w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <h3 className="mb-4 text-lg sm:text-xl font-bold">
              Still Have Questions?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Our friendly support team is here to help. Get answers to your
              questions within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <a href="mailto:support@beyondmeanings.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Support
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  View Help Center
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
