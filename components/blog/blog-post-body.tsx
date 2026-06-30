import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface BlogPostBodyProps {
  markdown: string
}

export function BlogPostBody({ markdown }: BlogPostBodyProps) {
  return (
    <div className="blog-md space-y-4 text-muted-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ node, ...props }) => (
            <h2
              className="mt-8 font-heading text-2xl font-bold text-foreground first:mt-0"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="mt-6 font-heading text-xl font-semibold text-foreground" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="leading-relaxed text-pretty text-muted-foreground" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="ml-6 list-disc space-y-2" {...props} />
          ),
          li: ({ node, ...props }) => <li {...props} />,
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-foreground" {...props} />
          ),
          hr: () => <hr className="my-8 border-border" />,
          a: ({ node, ...props }) => (
            <a
              className="font-medium text-primary no-underline transition-colors hover:text-accent"
              {...props}
            />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
