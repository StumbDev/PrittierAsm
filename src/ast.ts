export enum NodeType {
    Program,
    FunctionDeclaration,
    PrintStatement,
    IfStatement,
    ReturnStatement,
    BinaryExpression,
    Identifier,
    Literal,
}

export interface Node {
    type: NodeType;
}

export interface ProgramNode extends Node {
    type: NodeType.Program;
    body: Node[];
}

export interface FunctionDeclarationNode extends Node {
    type: NodeType.FunctionDeclaration;
    name: IdentifierNode;
    body: Node[];
}

export interface PrintStatementNode extends Node {
    type: NodeType.PrintStatement;
    argument: Node;
}

export interface IfStatementNode extends Node {
    type: NodeType.IfStatement;
    condition: Node;
    thenBlock: Node[];
}

export interface ReturnStatementNode extends Node {
    type: NodeType.ReturnStatement;
    argument: Node;
}

export interface BinaryExpressionNode extends Node {
    type: NodeType.BinaryExpression;
    left: Node;
    operator: string;
    right: Node;
}

export interface IdentifierNode extends Node {
    type: NodeType.Identifier;
    name: string;
}

export interface LiteralNode extends Node {
    type: NodeType.Literal;
    value: any;
}