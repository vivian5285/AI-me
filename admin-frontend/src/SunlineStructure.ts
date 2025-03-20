export interface Node {
    id: string; // 节点ID
    name: string; // 节点名称
    children: Node[]; // 子节点
}

export class SunlineStructure {
    root: Node;

    constructor(rootName: string) {
        this.root = { id: '1', name: rootName, children: [] };
    }

    addNode(parentId: string, nodeName: string): boolean {
        const parentNode = this.findNode(this.root, parentId);
        if (parentNode) {
            const newNode = { id: `${Date.now()}`, name: nodeName, children: [] };
            parentNode.children.push(newNode);
            return true;
        }
        return false;
    }

    private findNode(node: Node, id: string): Node | null {
        if (node.id === id) return node;
        for (const child of node.children) {
            const found = this.findNode(child, id);
            if (found) return found;
        }
        return null;
    }

    displayStructure(node: Node = this.root, level: number = 0): string {
        const indent = ' '.repeat(level * 2);
        let result = `${indent}${node.name} (ID: ${node.id})\n`;
        for (const child of node.children) {
            result += this.displayStructure(child, level + 1);
        }
        return result;
    }
}
