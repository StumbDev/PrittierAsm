// parser.ts

import { Lexer, TokenType } from './lexer';
import { NodeType, ProgramNode, FunctionDeclarationNode, PrintStatementNode, IfStatementNode, ReturnStatementNode, BinaryExpressionNode, IdentifierNode, LiteralNode, Node } from './ast';

export class Parser {
    private lexer: Lexer;
    private currentToken: any;

    constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }

    private consume(tokenType: TokenType): void {
        if (this.currentToken.type === tokenType) {
            this.currentToken = this.lexer.getNextToken();
        } else {
            throw new Error(`Unexpected token: ${this.currentToken.value}`);
        }
    }

    public parse(): ProgramNode {
        const body: Node[] = [];

        while (this.currentToken.type !== TokenType.EOF) {
            body.push(this.statement());
        }

        return { type: NodeType.Program, body };
    }

    private statement(): Node {
        if (this.currentToken.type === TokenType.Identifier && this.currentToken.value === 'func') {
            return this.functionDeclaration();
        }
        if (this.currentToken.type === TokenType.Identifier && this.currentToken.value === 'print') {
            return this.printStatement();
        }
        if (this.currentToken.type === TokenType.Identifier && this.currentToken.value === 'if') {
            return this.ifStatement();
        }
        throw new Error(`Unexpected statement: ${this.currentToken.value}`);
    }

    private functionDeclaration(): FunctionDeclarationNode {
        this.consume(TokenType.Identifier); // Consume 'func'
        const name = this.identifier();
        this.consume(TokenType.Parenthesis); // Consume '('
        this.consume(TokenType.Parenthesis); // Consume ')'
        const body: Node[] = [];
        while (this.currentToken.type !== TokenType.EOF) {
            body.push(this.statement());
        }
        return { type: NodeType.FunctionDeclaration, name, body };
    }

    private printStatement(): PrintStatementNode {
        this.consume(TokenType.Identifier); // Consume 'print'
        const argument = this.expression();
        return { type: NodeType.PrintStatement, argument };
    }

    private ifStatement(): IfStatementNode {
        this.consume(TokenType.Identifier); // Consume 'if'
        const condition = this.expression();
        const thenBlock: Node[] = [];
        while (this.currentToken.type !== TokenType.EOF) {
            thenBlock.push(this.statement());
        }
        return { type: NodeType.IfStatement, condition, thenBlock };
    }

    private identifier(): IdentifierNode {
        const id = this.currentToken.value;
        this.consume(TokenType.Identifier);
        return { type: NodeType.Identifier, name: id };
    }

    private expression(): Node {
        // Simple implementation for binary expressions
        const left = this.term();
        while (this.currentToken.type === TokenType.Operator) {
            const operator = this.currentToken.value;
            this.consume(TokenType.Operator);
            const right = this.term();
            return { type: NodeType.BinaryExpression, left, operator, right };
        }
        return left;
    }

    private term(): Node {
        // Simple implementation for literals and identifiers
        if (this.currentToken.type === TokenType.Number) {
            const value = this.currentToken.value;
            this.consume(TokenType.Number);
            return { type: NodeType.Literal, value: Number(value) };
        }
        if (this.currentToken.type === TokenType.Identifier) {
            return this.identifier();
        }
        throw new Error(`Unexpected term: ${this.currentToken.value}`);
    }
}