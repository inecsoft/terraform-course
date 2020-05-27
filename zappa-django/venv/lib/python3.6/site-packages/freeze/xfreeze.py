#!/usr/bin/env python
# -*- coding: UTF-8 -*-
# vim: autoindent expandtab tabstop=4 sw=4 sts=4 filetype=python

"""
Freeze the state of data-structures and objects for data-analysis or testing
(diffing data-structures). Frozen data-structures consist of only tuples
and these are comparable/sortable/hashable. The freeze() function can be used
for many purposes for example implement __hash__() for your complex object
very fast. dump() is intended for testing and analysis.

Authors: Jean-Louis Fuchs <ganwell@fangorn.ch> https://github.com/ganwell

Run doctests with "python -m freeze"

"""

# Copyright (c) 2012, Adfinis SyGroup AG
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
#     * Redistributions of source code must retain the above copyright
#       notice, this list of conditions and the following disclaimer.
#     * Redistributions in binary form must reproduce the above copyright
#       notice, this list of conditions and the following disclaimer in the
#       documentation and/or other materials provided with the distribution.
#     * Neither the name of the Adfinis SyGroup AG nor the
#       names of its contributors may be used to endorse or promote products
#       derived from this software without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS";
# ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
# DISCLAIMED. IN NO EVENT SHALL Adfinis SyGroup AG BE LIABLE FOR ANY
# DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
# (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
# LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
# ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
# SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


import difflib
import gzip
import inspect
import json
import sys

import six

if six.PY3:  # pragma: no cover
    from .fpprint import pformat
else:  # pragma: no cover
    from pprint import pformat

# These imports are need for doc tests.
nothing = json.__file__
nothing = gzip.__file__
del nothing

__all__ = [
    "freeze",
    "vformat",
    "dump",
    "tree_diff_assert",
    "tree_diff",
    "stable_hash",
    "recursive_hash",
    "recursive_sort",
    "transparent_repr",
    "traverse_frozen_data",
    "TraversalBasedReprCompare",
    "object_to_items",
]


try:
    _ignore_types = (six.string_types, tuple, bytes, type([]))
except:  # pragma: no cover
    _ignore_types = (six.string_types, tuple, type([]))

try:
    _string_types = (six.string_types,  bytes)
except:  # pragma: no cover
    _string_types = (six.string_types)

_primitive_types = (int, float, bool) + _string_types

_builtin_function_or_method_type = type(dict().get)


class _TestSlots(object):
    __slots__ = ("a", "b")

    def __init__(self):
        self.a = "slot"
        self.b = [1, 2, 3, (1, 2, 3)]


class _TestClass(object):
    def __init__(self, sub=False):
        self.a = "huhu"
        if sub:
            self.sub = _TestSlots()


class _TestClass2(object):
    def __init__(self, sub=False):
        self.a = "huhu"
        if sub:
            self.sub = _TestSlots()


class _TestClassWithLen(object):
    def __init__(self):
        self.a = "huhu"

    def __len__(self):
        return 1


def _no_null_x(string):
    lines = string.split("\n")
    new_lines = []
    for x in lines:
        if "at 0x" not in x:
            new_lines.append(x)
    return TransparentRepr("\n".join(new_lines))


def _py2_to_py3(string):
    parts = string.split("type")
    string = "class".join(parts)
    return TransparentRepr(string)


class WasDict(tuple):
    __slots__ = ()


class IDD(object):
    """Helper for recursive references.

    >>> a = IDD("a", 1)
    >>> b = IDD("b", 2)
    >>> a < b
    True
    >>> b = IDD("x", 1)
    >>> a == b
    True
    >>> b == 3
    False
    """
    __slots__ = ('idd', 'type_', 'is_visible', 'is_target')

    def __init__(self, data_structure, idd):
        self.type_ = str(type(data_structure))
        self.is_visible = not isinstance(
            data_structure, (tuple, list)
        )
        self.idd     = idd
        self.is_target = False

    def __repr__(self):
        if self.is_target:
            return '"T: %s at 0x%X"' % (
                self.type_, self.idd
            )
        else:
            return '"%s"' % self.type_

    def __hash__(self):
        return hash(self.type_)

    def __eq__(self, other):
        if not isinstance(other, IDD):
            return False
        return self.type_ == other.type_

    def __lt__(self, other):
        return self.idd < other.idd

    def __cmp__(self, other):  # pragma: no cover
        return self.type_.__cmp__(other.type_)


class Meta(list):
    __slots__ = ()


def freeze(data_structure):
    """Freeze tries to convert any data-structure in a hierarchy of tuples.
    Tuples are comparable/sortable/hashable, you can use this with
    with recursive_sort(). freeze has no recursion detection.

    :param   data_structure: The structure to convert.

    >>> recursive_sort(freeze(_TestClass(True)))
    (('a', 'huhu'), ('sub', (('a', 'slot'), ('b', (1, (1, 2, 3), 2, 3)))))
    >>> dump((None, (None, None)))
    (None, (None, None))
    """
    def freeze_helper(data_structure):
        # We don't freeze primitive types
        if isinstance(data_structure, _primitive_types):
            return data_structure
        was_dict = False
        if (
            hasattr(data_structure, "__slots__") and
            not isinstance(data_structure, (Meta, IDD, WasDict))
        ):
            data_structure = tuple(object_to_items(data_structure))
            was_dict = True
        else:
            # Dictize if possible (support objects)
            try:
                data_structure = data_structure.__dict__
                was_dict = True
            except:
                pass
            # Itemize if needed
            try:
                data_structure = data_structure.items()
            except:
                pass
        tlen = -1
        # If item has a length we freeze it
        try:
            tlen = len(data_structure)
        except:  # pragma: no cover
            pass
        if tlen != -1:
            # Well there are classes out in the wild that answer to len
            # but have no indexer.
            try:
                if was_dict:
                    return WasDict([
                        freeze_helper(x) for x in data_structure
                    ])
                else:
                    return tuple([
                        freeze_helper(x) for x in data_structure
                    ])
            except:  # pragma: no cover
                pass
        return data_structure  # pragma: no cover
    return freeze_helper(data_structure)


def object_to_items(data_structure):
    """Converts a object to a items list respecting also slots.

    Use dict(object_to_items(obj)) to get a dictionary."""
    items = []
    # Get all items from dict
    try:
        items = list(data_structure.__dict__.items())
    except:
        pass
    # Get all slots
    hierarchy = [data_structure]
    try:
        hierarchy += inspect.getmro(data_structure)
    except:
        pass
    slots = []
    try:
        for b in hierarchy:
            try:
                slots += b.__slots__
            except:  # pragma: no cover
                pass
    except:  # pragma: no cover
        pass
    # Get attrs from slots
    for x in slots:
        items.append((x, getattr(data_structure, x)))
    return items


def dump(data_structure):
    """Dump will create a human readable version of your data-structure.
    It will try to dump almost anything, it has recursion detection and
    will try to display the recursion in a meaningful way.

    :param   data_structure: The structure to convert.

    When you freeze only content counts, same content same hash

    >>> a = hash(freeze(_TestClass(True)))
    >>> b = hash(freeze(_TestClass(True)))
    >>> b == a
    True

    >>> a = freeze(_TestClass(True))
    >>> b = freeze(_TestClass(True))
    >>> b == a
    True

    >>> x = _TestClass(True)
    >>> a = freeze(dump(x))
    >>> b = freeze(dump(x))
    >>> b == a
    True

    When you dump-freeze only content/type counts, same content/type same hash

    - Two object of the same type with same content will be equal

    - Two object of the different type with same content will be different

    >>> a = hash(freeze(dump(_TestClass(True))))
    >>> b = hash(freeze(dump(_TestClass(True))))
    >>> b == a
    True

    >>> a = freeze(dump(_TestClass(True)))
    >>> b = freeze(dump(_TestClass(True)))
    >>> b == a
    True

    >>> a = hash(freeze(dump(_TestClass(True))))
    >>> b = hash(freeze(dump(_TestClass2(True))))
    >>> b != a
    True

    >>> a = freeze(dump(_TestClass(True)))
    >>> b = freeze(dump(_TestClass2(True)))
    >>> b != a
    True

    >>> _py2_to_py3(vformat(dump([1, {'a' : 'b'}])))
    [1,
     ["<class 'dict'>",
      {'a': 'b'}]]

    >>> vformat(recursive_sort(dump(_TestClass(True))))
    ["<class 'freeze.xfreeze._TestClass'>",
     (('a',
       'huhu'),
      ('sub',
       ["<class 'freeze.xfreeze._TestSlots'>",
        (('a',
          'slot'),
         ('b',
          (1,
           (1,
            2,
            3),
           2,
           3)))]))]

    >>> a = _TestSlots()
    >>> b = [a, 1, 2, [a, "banane"]]
    >>> _no_null_x(vformat(dump(b)))
      {'a': 'slot',
       'b': [1,
             2,
             3,
             (1,
              2,
              3)]}],
     1,
     2,
      'banane']]

    >>> a = [1, 2]
    >>> _no_null_x(vformat(dump((a, (a, a)))))
    ([1,
      2],
     ([1,
       2],
      [1,
       2]))

    >>> recursive_sort(dump(freeze(_TestClass(True))))
    (('a', 'huhu'), ((('a', 'slot'), ('b', (1, (1, 2, 3), 2, 3))), 'sub'))

    >>> dump((None, (None, None)))
    (None, (None, None))

    >>> s = _TestClassWithLen()
    >>> a = [s, s]
    >>> _no_null_x(vformat(dump(a)))
      {'a': 'huhu'}],

    >>> s = (1, 2)
    >>> a = [s, s]
    >>> _no_null_x(vformat(dump(a)))
    [(1,
      2),
     (1,
      2)]
    """

    identity_set = set()
    dup_set      = set()

    def dump_helper(data_structure):
        if data_structure is None:
            return None
        # Primitive types don't need processing
        if isinstance(data_structure, _primitive_types):
            return data_structure
        # Cycle detection
        idd = id(data_structure)
        if idd in identity_set:
            # We do not recurse into containers
            tlen = -1
            try:
                tlen = len(data_structure)
            except:  # pragma: no cover
                pass
            if tlen != -1:
                # We do not recurse into dictizable objects
                if (
                    hasattr(data_structure, "__dict__") or
                    hasattr(data_structure, "__slots__")
                ):
                    # Special case where __len__ is implemented
                    dup_set.add(idd)
                    return "R: %s at 0x%X" % (type(data_structure), idd)
                # Except string and tuples
                if not isinstance(
                        data_structure,
                        _ignore_types
                ):  # pragma: no cover
                    dup_set.add(idd)
                    return "R: %s at 0x%X" % (type(data_structure), idd)
            else:
                dup_set.add(idd)
                return "R: %s at 0x%X" % (type(data_structure), idd)

        else:
            identity_set.add(idd)
        ret = Meta()
        ret.append(IDD(data_structure, idd))
        was_dict = isinstance(data_structure, WasDict)
        was_tuple = isinstance(data_structure, tuple)
        if not was_dict:
            if hasattr(data_structure, "__slots__"):
                data_structure = dict(object_to_items(data_structure))
                was_dict = True
            else:
                # Dictize if possible (support objects)
                try:
                    data_structure = data_structure.__dict__
                    was_dict = True
                except:
                    pass
        # Itemize if possible
        try:
            data_structure = data_structure.items()
            ret.append(dict([
                (dump_helper(x[0]), dump_helper(x[1]))
                for x in data_structure
            ]))
            return ret
        except:
            pass
        tlen = -1
        # If item has a length we dump it
        try:
            tlen = len(data_structure)
        except:  # pragma: no cover
            pass
        if tlen != -1:
            # Well there are classes out in the wild that answer to len
            # but have no indexer.
            try:
                if was_dict:
                    ret.append(WasDict([
                        (dump_helper(x[0]), dump_helper(x[1]))
                        for x in data_structure
                    ]))
                elif was_tuple:
                    ret.append(tuple([
                        dump_helper(x) for x in data_structure
                    ]))
                else:
                    ret.append([
                        dump_helper(x) for x in data_structure
                    ])
                return ret
            except:  # pragma: no cover
                pass
        ret.append(data_structure)  # pragma: no cover
        return ret  # pragma: no cover

    def clean_up(data_structure):
        if isinstance(data_structure, Meta):
            idd_temp = data_structure[0]
            idd_temp.is_target = idd_temp.idd in dup_set
            if not (
                idd_temp.is_target or
                idd_temp.is_visible
            ):
                del data_structure[0]
            if len(data_structure) == 1:
                data_structure = data_structure[0]
        # We don't clean strings
        if not isinstance(data_structure, _string_types):
            tlen = -1
            # If item has a length we clean it
            try:
                tlen = len(data_structure)
            except:
                pass
            if tlen != -1:
                if isinstance(data_structure, dict):
                    for k in data_structure.keys():
                        data_structure[k] = clean_up(data_structure[k])
                elif isinstance(data_structure, Meta):
                    data_structure = Meta([
                        clean_up(x) for x in data_structure
                    ])
                elif isinstance(data_structure, tuple):
                    data_structure = tuple([
                        clean_up(x) for x in data_structure
                    ])
                else:
                    data_structure = [
                        clean_up(x) for x in data_structure
                    ]
        return data_structure
    data = clean_up(dump_helper(data_structure))
    return data


def recursive_sort(data_structure):
    """Sort a recursive data_structure.

    :param   data_structure: The structure to convert.

    data_structure must be already sortable or you must use freeze() or dump().
    The function will work with many kinds of input. Dictionaries will be
    converted to lists of tuples.

    >>> _py2_to_py3(vformat(recursive_sort(dump(
    ...     [3, 1, {'c' : 'c', 'a' : 'b', 'b' : 'a'}]
    ... ))))
    (["<class 'dict'>",
      (('a',
        'b'),
       ('b',
        'a'),
       ('c',
        'c'))],
     1,
     3)
    >>> recursive_sort([3, 1, {'c' : 'c', 'a' : 'b', 'b' : 'a'}])
    ((('a', 'b'), ('b', 'a'), ('c', 'c')), 1, 3)
    >>> recursive_sort(_TestClass())
    (('a', 'huhu'),)
    """
    # We don't sory primitve types
    if not isinstance(data_structure, _primitive_types):
        is_meta = isinstance(data_structure, Meta)
        was_dict = isinstance(data_structure, WasDict)
        if not (is_meta or was_dict):
            was_dict = isinstance(data_structure, dict)
            if not was_dict:
                # Dictize if possible (support objects)
                try:
                    data_structure = data_structure.__dict__
                    was_dict = True
                except:
                    pass
            # Itemize if possible
            try:
                data_structure = data_structure.items()
            except:
                pass
        tlen = -1
        # If item has a length we sort it
        try:
            tlen = len(data_structure)
        except:  # pragma: no cover
            pass
        if tlen != -1:
            # Well there are classes out in the wild that answer to len
            # but have no indexer.
            try:
                if was_dict:
                    return tuple(sorted(
                        [
                            (
                                recursive_sort(x[0]),
                                recursive_sort(x[1]),
                            )
                            for x in data_structure
                        ],
                        key=TraversalBasedReprCompare
                    ))
                elif is_meta:
                    return data_structure[0:-1] + [
                        recursive_sort(
                            data_structure[-1]
                        )
                    ]
                else:
                    return tuple(sorted(
                        [recursive_sort(
                            x,
                        ) for x in data_structure],
                        key=TraversalBasedReprCompare,
                    ))
            except:  # pragma: no cover
                pass
    return data_structure


def stable_hash(data_structure):
    """Stable hash does: hash(recursive_sort(freeze(data_structure)))

    >>> a = stable_hash(_TestClass(True))
    >>> b = stable_hash(_TestClass(True))
    >>> a == b
    True
    """
    return hash(recursive_sort(freeze(data_structure)))


def recursive_hash(data_structure):
    """Recursive hash does: hash(freeze(data_structure))

    >>> a = recursive_hash(_TestClass(True))
    >>> b = recursive_hash(_TestClass(True))
    >>> a == b
    True
    """
    return hash(freeze(data_structure))


class TransparentRepr(str):
    """That doctest calls __repr__ is very annoying, you can't follow PEP8
    on large objects. TransparentRepr makes string represent itself
    including all non-printable characters."""

    # TODO: slots?
    def __repr__(self):
        return self


def transparent_repr(string):
    """The result is __repr__ transparent. Non-printable
    characters won't be escaped

    >>> transparent_repr(3)
    3
    """
    return TransparentRepr(string)


def vformat(*args, **kwargs):
    """A pformat wrapper that produces narrow representations of
    data-structures. The result is __repr__ transparent. Non-printable
    characters won't be escaped"""
    return TransparentRepr(
        pformat(*args, width=1, **kwargs)
    )


def traverse_frozen_data(data_structure):
    """Yields the leaves of the frozen data-structure pre-order.

    It will produce the same order as one would write the data-structure."""
    parent_stack = [data_structure]
    while parent_stack:
        node = parent_stack.pop(0)
        # We don't iterate strings
        tlen = -1
        if not isinstance(node, _string_types):
            # If item has a length we freeze it
            try:
                tlen = len(node)
            except:
                pass
        if tlen == -1:
            yield node
        else:
            parent_stack = list(node) + parent_stack


class TraversalBasedReprCompare(object):
    """Implements the comparison method for frozen data-structures based on
    traverse_frozen_data.

    >>> cm = TraversalBasedReprCompare
    >>> cm(3) < cm(4)
    True
    >>> cm(4) > cm(3)
    True
    >>> cm(3) > cm(4)
    False
    >>> cm(3) == cm(3)
    True
    >>> cm(3) == cm(4)
    False
    >>> cm((3, 3)) > cm((3,))
    True
    >>> cm((3, 3)) == cm((3, 3))
    True
    >>> cm((3,)) > cm((3, 3))
    False
    >>> cm((3,)) == cm((3, 3))
    False
    """

    def __init__(self, payload):
        """Initialize a payload (usually a key) for comparison"""
        self.payload   = payload

    def _cmp(self, other):
        """Generic cmp method to support python 2/3"""
        self_gen  = traverse_frozen_data(self.payload)
        other_gen = traverse_frozen_data(other.payload)
        while True:
            try:
                self_node  = repr(next(self_gen))
            except StopIteration:
                self_node  = None
            try:
                other_node = repr(next(other_gen))
            except StopIteration:
                other_node = None
            if self_node is None or other_node is None:
                # We iterated to the end
                if self_node is not None:
                    return 1
                if other_node is not None:
                    return -1
                return 0
            if self_node != other_node:
                return (
                    self_node > other_node
                ) - (
                    self_node < other_node
                )

    def __lt__(self, other):
        return self._cmp(other) < 0

    def __eq__(self, other):
        return self._cmp(other) == 0

    def __cmp__(self, other):  # pragma: no cover
        return self._cmp(other)


def tree_diff(a, b, n=5, sort=False):
    """Dump any data-structure or object, traverse
    it depth-first in-order and apply a unified diff.

    Depth-first in-order is just like structure would be printed.

    :param             a: data_structure a
    :param             b: data_structure b
    :param             n: lines of context
    :type              n: int
    :param          sort: sort the data-structure

    ATTENTION: Sorting means changing the data-structure. The test-result may
    differ. But in case of dictionaries the results become comparable because
    the sorting negates the hash-algorithms "de-sorting".

    >>> a = recursive_sort(freeze([
    ...     'a',
    ...     [3, 4],
    ...     {'a': [3, {'w' : set([4, '3', frozenset([3,5,2])])}]},
    ...     []
    ... ]))
    >>> b = recursive_sort(freeze([
    ...     'a',
    ...     [7, 3],
    ...     {'a': [3, {'w' : set([4, '3', frozenset([2,5,3])])}]},
    ...     []
    ... ]))
    >>> transparent_repr("\\n".join(tree_diff(a, b).split("\\n")[2:]))
    @@ -7,6 +7,6 @@
           'w'),),
         3),
        'a'),),
      'a',
      (3,
    -  4))
    +  7))

    >>> a = [
    ...     'a',
    ...     [3, 4],
    ...     {'a': [3, {'w' : set([4, '3', frozenset([3,5,2])])}]},
    ...     []
    ... ]
    >>> b = [
    ...     'a',
    ...     [7, 3],
    ...     {'a': [3, {'w' : set([4, '3', frozenset([2,5,3])])}]},
    ...     []
    ... ]
    >>> transparent_repr("\\n".join(
    ...     tree_diff(a, b, sort=True
    ... ).split("\\n")[2:]))
    @@ -11,6 +11,6 @@
               '3',
               4)]),)],
          3)),)],
      'a',
      (3,
    -  4))
    +  7))

    """
    a = dump(a)
    b = dump(b)
    if not sort:
        a = vformat(a).split("\n")
        b = vformat(b).split("\n")
    else:
        a = vformat(recursive_sort(a)).split("\n")
        b = vformat(recursive_sort(b)).split("\n")
    return "\n".join(difflib.unified_diff(a, b, n=n, lineterm=""))


def tree_diff_assert(a, b, n=5, sort=False):
    """User tree_diff() to assert a equals b. Dump any data-structure or
    object, traverse it depth-first and apply a unified diff, to display
    the result.

    :param             a: data_structure a
    :param             b: data_structure b
    :param             n: lines of context
    :type              n: int
    :param          sort: sort the data-structure

    ATTENTION: Sorting means changing the data-structure. The test-result may
    differ. But in case of dictionaries the results become comparable because
    the sorting negates the hash-algorithms "de-sorting".

    >>> a = [
    ...     'a',
    ...     [3, 4],
    ...     {'a': [3, {'w' : set([4, 'tree', frozenset([3,5,2])])}]},
    ...     []
    ... ]
    >>> b = [
    ...     'a',
    ...     [4, 3],
    ...     {'a': [3, {'w' : set([4, '3', frozenset([2,5,3])])}]},
    ...     []
    ... ]
    >>> try:
    ...     tree_diff_assert(a, b, sort=True)
    ... except:
    ...     "GOT IT"
    'GOT IT'

    >>> a = [
    ...     'a',
    ...     [3, 4],
    ...     {'a': [3, {'w' : set([4, '3', frozenset([3,5,2])])}]},
    ...     []
    ... ]
    >>> b = [
    ...     'a',
    ...     [4, 3],
    ...     {'a': [3, {'w' : set(['3', 4, frozenset([2,5,3])])}]},
    ...     []
    ... ]
    >>> tree_diff_assert(a, b, sort=True)

    >>> a = [
    ...     'a',
    ...     [3, 4],
    ...     {'a': [3, {'w' : set([4, '3', frozenset([3,5,2])])}]},
    ...     []
    ... ]
    >>> b = [
    ...     'a',
    ...     [4, 3],
    ...     {'a': [3, {'w' : set(['3', 4, frozenset([2,5,3])])}]},
    ...     []
    ... ]
    >>> try:
    ...     tree_diff_assert(a, b, sort=False)
    ... except:
    ...     "GOT IT"
    'GOT IT'
    """

    a = dump(a)
    b = dump(b)
    if not sort:
        a = vformat(a).split("\n")
        b = vformat(b).split("\n")
    else:
        a = vformat(recursive_sort(a)).split("\n")
        b = vformat(recursive_sort(b)).split("\n")
    msg = "\n".join(difflib.unified_diff(a, b, n=n, lineterm=""))
    if len(msg) != 0:
        assert False, "difference: \n%s" % msg


if __name__ == "__main__":  # pragma: no cover
    import doctest
    import freeze  # noqa
    result = doctest.testmod(freeze)
    sys.exit(result.failed)
# pylama:ignore=W0702,R0912,R0911,W0404
