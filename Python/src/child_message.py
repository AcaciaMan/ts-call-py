from child_channel import ChildChannel

class ChildMessage(object):
    """
    docstring
    """
    def __init__(self):
        """
        docstring
        """
        self.m_channel = ChildChannel()
        self.json_object = None
        self.args = {}
        self.m_return_dict = {}

    def m_return_reply(self):
        self.m_channel.reply(self.m_return_dict)
        self.json_object = None
        self.args = {}
        self.m_return_dict = {}
