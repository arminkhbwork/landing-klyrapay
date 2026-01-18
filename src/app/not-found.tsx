import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold tracking-widest text-indigo-600 dark:text-indigo-300">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-4xl dark:text-white">
          This page doesn’t exist.
        </h1>
        <p className="mt-4 text-base leading-7 text-pretty text-zinc-600 dark:text-zinc-300">
          If you followed an outdated link, head back to the homepage.
        </p>
        <div className="mt-8 flex justify-center">
          <LinkButton href="/" variant="secondary">
            Back home
          </LinkButton>
        </div>
      </div>
    </Container>
  );
}
