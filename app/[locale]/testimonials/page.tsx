import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { messages, toLocale } from "@/i18n";

const TestimonialsPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const text = messages[toLocale((await params).locale)].testimonials;
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>{text.title}</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          {text.subtitle}
        </PageHeaderHeading>
      </PageHeader>
    </>
  );
};
export default TestimonialsPage;
