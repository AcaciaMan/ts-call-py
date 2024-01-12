import json
from typing import Any
from child_message import ChildMessage, ChildMessageType

from typing import TypedDict

class PythonScriptType(TypedDict):
    imports: list
    declarations: list
    code: list
    m_return: str


class ChildExec(object):
    """
    docstring
    """
    def __init__(self):
        """
        docstring
        """
        self.message: ChildMessage = None
        self.execs: list = None

    def __call__(self, *args: Any, **kwds: Any):
        """
        docstring
        """
        self.execs = []
        return self
    
class ChildExecScript(ChildExec):
    """
    docstring
    """
    def __init__(self):
        """
        docstring
        """
        super().__init__()

    def __call__(self, *args: Any, **kwds: Any):
        """
        docstring
        """
        self.execs = []
        print('here', flush=True)
        if 'imports' in self.message.json_object:
            for x in self.message.json_object['imports']:
                print('here1', x, flush=True)
                self.execs.append(x)

        if 'declarations' in self.message.json_object:
            for x in self.message.json_object['declarations']:
                for y in x.keys():
                    self.execs.append(y + ' = ' + json.dumps(x[y]))

        return self

class ChildExecFactory(object):
    """
    docstring
    """
    @staticmethod
    def create_child_exec(message: ChildMessage):
        """
        docstring
        """
        print('here2', flush=True)
        if (message.json_object is None):
            return ChildExec()
        
        print('here3', flush=True)
        if 'type' in message.json_object:
            print(message.json_object['type'], flush=True)
            if message.json_object['type'] == ChildMessageType.python_script.name:
                print('here5', flush=True)
                childExecScript = ChildExecScript()
                childExecScript.message = message
                return childExecScript
        
        return ChildExec()