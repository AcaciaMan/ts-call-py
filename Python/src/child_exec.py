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
                    for z in x[y].keys():
                        self.execs.append(y + '_' + z + ' = ' + y + '["' + z +'"]')

        if 'code' in self.message.json_object:
            for x in self.message.json_object['code']:
                print('here1', x, flush=True)
                self.execs.append(x)

        if 'm_return' in self.message.json_object:
            var = self.message.json_object['m_return']
            # create dict with name "m_return" + "_dict"
            print('here1', var, flush=True)
            self.execs.append('child_message.m_return_dict["'+var+'"] = ' + var)        

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
        if (message.json_object is None):
            return ChildExec()
        
        if 'type' in message.json_object:
            print(message.json_object['type'])
            if message.json_object['type'] == ChildMessageType.python_script.name:
                childExecScript = ChildExecScript()
                childExecScript.message = message
                return childExecScript
        
        return ChildExec()