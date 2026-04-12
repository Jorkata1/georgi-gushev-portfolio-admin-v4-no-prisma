import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-padding">
      <Container className="max-w-3xl text-center">
        <span className="eyebrow justify-center">404</span>
        <h1 className="display-title mt-5">Страницата не беше намерена.</h1>
        <p className="mt-6 text-lg text-slate-300">
          Възможно е линкът да е променен или страницата да не съществува вече.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button>Обратно към началото</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
