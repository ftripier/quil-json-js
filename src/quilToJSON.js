import ohm from 'ohm-js';
import grammar from './grammar.ohm';

const unpackOptional = optional => {
  const unpacked = optional.quilToJSON();
  if (unpacked.length > 0) {
    return unpacked[0];
  }
  return undefined;
};

/* eslint-disable no-unused-vars */
// we have unused variables in the visitor functions because Ohm uses
// function arity as a bizzare form of dynamic typechecking.
export default function quilToJSON(quilProgram) {
  const parser = ohm.grammar(grammar);
  const semantics = parser.createSemantics().addOperation('quilToJSON', {
    quil: (instructions, trailingSpace) => instructions.quilToJSON(),
    allInstr: instruction => instruction.quilToJSON(),
    instr: instruction => instruction.quilToJSON(),
    memoryDescriptor(
      declare,
      identifierSpace1,
      register,
      identifierSpace2,
      field,
      leftBracket,
      index,
      rightBracket,
      sharing,
      sharingIdentifier,
      sharingOffsetDescriptor
    ) {
      const parsedSharing = unpackOptional(sharingIdentifier);
      return {
        type: declare.quilToJSON(),
        register: register.quilToJSON(),
        field: field.quilToJSON(),
        index: unpackOptional(index),
        sharing: parsedSharing
          ? {
              register: parsedSharing,
              offset: sharingOffsetDescriptor.quilToJSON()
            }
          : undefined
      };
    },
    offsetDescriptor(offset, leftSpace, index, rightSpace, register) {
      return {
        type: offset.quilToJSON(),
        index: index.quilToJSON(),
        register: register.quilToJSON()
      };
    },
    defGate(defgate, leftSpace, name, leftP, variables, rightP, colon, eol, matrix) {
      return {
        type: defgate.quilToJSON(),
        name: name.quilToJSON(),
        variables: variables.quilToJSON(),
        matrix: matrix.quilToJSON()
      };
    },
    variable(percent, identifier) {
      return identifier.quilToJSON();
    },
    matrix(matrixRows, lines) {
      return matrixRows.quilToJSON();
    },
    matrixRow(tab, expressions) {
      return expressions.quilToJSON();
    },
    gate(name, leftP, params, rightP, space, qubitSpaces, qubits) {
      return {
        type: 'GATE',
        name: name.quilToJSON(),
        params: unpackOptional(params),
        qubits: qubits.quilToJSON()
      };
    },
    param: e => e.quilToJSON(),
    name: identifier => identifier.quilToJSON(),
    measure(measure, leftSpace, qubit, rightSpace, address) {
      return {
        type: measure.quilToJSON(),
        qubitIndex: qubit.quilToJSON(),
        address: unpackOptional(address)
      };
    },
    addr_dereference(identifier, leftBracket, index, rightBracket) {
      return {
        type: 'ADDRESS',
        addressType: 'DEREFERENCE',
        address: unpackOptional(identifier),
        index: index.quilToJSON()
      };
    },
    addr_constant(identifier) {
      return {
        type: 'ADDRESS',
        addressType: 'CONSTANT',
        address: identifier.quilToJSON()
      };
    },
    qubit(int) {
      return parseInt(this.sourceString, 10);
    },
    identifier(firstLetter, continutation) {
      return this.sourceString;
    },
    int(int) {
      return parseInt(this.sourceString, 10);
    },
    expression(e) {
      return {
        type: 'EXPRESSION',
        expression: this.sourceString
      };
    },
    defCircuit(
      defcircuit,
      space,
      name,
      leftP,
      variables,
      rightP,
      variableSpaces,
      qubitVariables,
      colon,
      eol,
      circuit
    ) {
      return {
        type: defcircuit.quilToJSON(),
        name: name.quilToJSON(),
        variables: unpackOptional(variables),
        qubitVariables: qubitVariables.quilToJSON(),
        circuit: circuit.quilToJSON()
      };
    },
    qubitVariable(identifier) {
      return identifier.quilToJSON();
    },
    circuitQubit(qubit) {
      return qubit.quilToJSON();
    },
    circuitGate(name, lParen, params, rParen, space, circuitQubits) {
      return {
        type: 'CIRCUITGATE',
        name: name.quilToJSON(),
        params: unpackOptional(params),
        qubits: circuitQubits.quilToJSON()
      };
    },
    circuitMeasure(measure, leftSpace, circuitQubit, rightSpace, address) {
      return {
        type: measure.quilToJSON(),
        qubit: circuitQubit.quilToJSON(),
        address: unpackOptional(address)
      };
    },
    circuitResetState(reset, circuitQubit) {
      return {
        type: reset.quilToJSON(),
        qubit: unpackOptional(circuitQubit)
      };
    },
    circuitInstr: instr => instr.quilToJSON(),
    circuit(tabs, circuitInstrs, eols) {
      return circuitInstrs.quilToJSON();
    },
    defLabel(deflabel, space, label) {
      return {
        type: deflabel.quilToJSON(),
        label: label.quilToJSON()
      };
    },
    label(at, identifier) {
      return {
        type: 'LABEL',
        name: identifier.quilToJSON()
      };
    },
    halt(halt) {
      return {
        type: halt.quilToJSON()
      };
    },
    jump(jump, space, label) {
      return {
        type: jump.quilToJSON(),
        label: label.quilToJSON()
      };
    },
    jumpWhen(jumpWhen, leftSpace, label, rightSpace, address) {
      return {
        type: jumpWhen.quilToJSON(),
        label: label.quilToJSON(),
        address: address.quilToJSON()
      };
    },
    jumpUnless(jumpUnless, leftSpace, label, rightSpace, address) {
      return {
        type: jumpUnless.quilToJSON(),
        label: label.quilToJSON(),
        address: address.quilToJSON()
      };
    },
    resetState(reset, space, qubit) {
      return {
        type: reset.quilToJSON(),
        qubit: unpackOptional(qubit)
      };
    },
    wait(wait) {
      return {
        type: wait.quilToJSON()
      };
    },
    classicalUnary(unaryOperation, addr) {
      return {
        type: unaryOperation.quilToJSON(),
        address: addr.quilToJSON()
      };
    },
    classicalBinary(binaryOp) {
      return binaryOp.quilToJSON();
    },
    logicalBinaryOp(operationType, leftSpace, left, rightSpace, right) {
      return {
        type: 'LOGICALBINARYOP',
        operationType: operationType.quilToJSON(),
        left: left.quilToJSON(),
        right: right.quilToJSON()
      };
    },
    move(move, leftSpace, left, rightSpace, right) {
      return {
        type: move.quilToJSON(),
        left: left.quilToJSON(),
        right: right.quilToJSON()
      };
    },
    exchange(exchange, leftSpace, left, rightSpace, right) {
      return {
        type: exchange.quilToJSON(),
        left: left.quilToJSON(),
        right: right.quilToJSON()
      };
    },
    convert(convert, leftSpace, left, rightSpace, right) {
      return {
        type: convert.quilToJSON(),
        left: left.quilToJSON(),
        right: right.quilToJSON()
      };
    },
    load(load, targetSpace, target, leftSpace, left, rightSpace, right) {
      return {
        type: load.quilToJSON(),
        left: left.quilToJSON(),
        right: right.quilToJSON(),
        target: target.quilToJSON()
      };
    },
    store(store, target, targetSpace, leftSpace, left, rightSpace, right) {
      return {
        type: store.quilToJSON(),
        target: target.quilToJSON(),
        left: left.quilToJSON(),
        right: right.quilToJSON()
      };
    },
    classicalComparison(comparisonType, targetSpace, target, leftSpace, left, rightSpace, right) {
      return {
        type: 'COMPARISON',
        comparisonType: comparisonType.quilToJSON(),
        target: target.quilToJSON(),
        left: left.quilToJSON(),
        right: right.quilToJSON()
      };
    },
    nop(nop) {
      return {
        type: nop.quilToJSON()
      };
    },
    include(include, space, fileName) {
      throw new Error('Not Implemented');
    },
    pragma(pragma, leftSpace, command, rightSpace, args, namesSpace, freeformText) {
      throw new Error('Not Implemented');
    },
    nonemptyListOf(x, sep, xs) {
      return [x.quilToJSON()].concat(xs.quilToJSON());
    },
    _terminal() {
      return this.sourceString;
    }
  });

  const match = parser.match(quilProgram);
  if (match.failed()) {
    throw new Error(match.message);
  }

  return semantics(match).quilToJSON();
}
