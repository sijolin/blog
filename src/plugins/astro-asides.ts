import type { AstroIntegration } from "astro";
import type * as mdast from "mdast";
import remarkDirective from "remark-directive";
import type * as unified from "unified";
import { remove } from "unist-util-remove";
import { visit } from "unist-util-visit";
import type { BlockContent } from "mdast";
import type { MdxJsxAttribute } from "mdast-util-mdx-jsx";

interface NodeProps {
	attributes?: Record<string, string | boolean | number | undefined | null>;
}

const AsideTagname = "AutoImportedAside";
export const asideAutoImport: Record<string, [string, string][]> = {
	"./src/components/Aside.astro": [["default", AsideTagname]],
};

export function makeComponentNode(
	name: string,
	{ attributes = {} }: NodeProps = {},
	...children: BlockContent[]
): any {
	return {
		type: "mdxJsxFlowElement",
		name,
		attributes: Object.entries(attributes)
			// Filter out non-truthy attributes to avoid empty attrs being parsed as `true`.
			.filter(([_k, v]) => v !== false && Boolean(v))
			.map(([name, value]) => ({
				type: "mdxJsxAttribute",
				name,
				value: value as MdxJsxAttribute["value"],
			})),
		children,
	};
}

function remarkAsides(): unified.Plugin<[], mdast.Root> {
	const variants = new Set(["note", "tip", "caution", "danger"]);

	const transformer: unified.Transformer<mdast.Root> = tree => {
		visit(tree, (node: any, index, parent) => {
			if (!parent || typeof index !== "number" || node.type !== "containerDirective")
				return;
			const type = node.name;
			if (!variants.has(type)) return;
			let title: string | undefined;
			remove(node, (child: any) => {
				if (child.data?.directiveLabel) {
					if ("children" in child && "value" in child.children[0]) {
						title = child.children[0].value;
					}
					return true;
				}
			});

			// Replace this node with the aside component it represents.
			parent.children[index] = makeComponentNode(
				AsideTagname,
				{ attributes: { type, title } },
				...node.children
			);
		});
	};

	return function attacher() {
		return transformer;
	};
}

export function astroAsides(): AstroIntegration {
	return {
		name: "@astrojs/asides",
		hooks: {
			"astro:config:setup": ({ updateConfig }) => {
				updateConfig({
					markdown: {
						remarkPlugins: [remarkDirective, remarkAsides()],
					},
				});
			},
		},
	};
}