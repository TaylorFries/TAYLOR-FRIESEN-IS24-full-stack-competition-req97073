import random
import uuid
import datetime
import json

file_to_write_to = "site_backend/src/product-content.json"


""" This file will create a random number of products (between 0 - 39)
    then randomly generate and populate each of the fields specified in
    the assignment details. 
"""

#very normal first names
common_first_names = [
    "Taylor",
    "Sleve",
    "Onson",
    "Anatoli",
    "Rey",
    "Glenallen",
    "Mario",
    "Raul",
    "Kevin",
    "Tony",
    "Bobson",
    "Willie",
    "Jeromy",
    "Scott",
    "Shown",
    "Dean",
    "Mike",
    "Dwigt",
    "Tim",
    "Karl",
    "Mike",
    "Todd"
]

#commonly seen last names
common_last_names = [
    "Friesen",
    "McDichael",
    "Sweemey",
    "Archideld",
    "Smorin",
    "McSriff",
    "Mixon",
    "McRlwain",
    "Chamgerlain",
    "Nogilny",
    "Smehrik",
    "Dugnutt",
    "Dustice",
    "Gride",
    "Dourque",
    "Furcotte",
    "Wesrey",
    "Truk",
    "Rortugal",
    "Sandaele",
    "Dandleton",
    "Sernandez",
    "Bonzalez"
]

#I assume a lot of your projects are names "Cool ..."
first_product_names = [
    "Cool",
    "Important",
    "Business",
    "Urgent",
    "Rad",
    "New",
    "Old",
    "Alpha",
    "Beta",
    "Gamma",
    "Refactor",
    "Rebuild",
    "Research",
    "Develop",
    "Implement"
]

#just a sample of things I have experience in 
last_product_names = [
    "Looker",
    "AWS",
    "Docker",
    "Java",
    "Python",
    "React",
    "Node",
    "MERN",
    "CRUD",
    "Web App",
]

def build_name():
    """
    Builds and returns a random name using a random selection 
    of the very normal names above
    """
    rand_first = random.randint(0, len(common_first_names) - 1) 
    rand_last = random.randint(0, len(common_last_names) - 1)
    first_name = common_first_names[rand_first]
    last_name = common_last_names[rand_last]
    return(first_name + " " + last_name)

def build_dev_list():
    """
    Uses build_name to get a random mount of dev names to place in
    the dev list. returns a list of names. 
    """
    num_devs = random.randint(1, 5)
    taylors_place = random.randint(0, num_devs - 1 )
    no_1_best_dev = "Taylor Friesen"
    dev_li = []
    for i in range(num_devs):
        #as a hard worker I expect I will be in all the projects
        #so I have included that
        if i == taylors_place:
            dev_li.append(no_1_best_dev)
        else:
            new_dev = build_name()
            #I am a good worker... but I cant be 2 devs
            if (new_dev == no_1_best_dev):
                new_dev = build_name()
            dev_li.append(new_dev)

    return dev_li

def build_product_name():
    """
    build out a product name using list of normal product names
    return a string
    """
    rand_prod_first = random.randint(0, len(first_product_names) - 1)
    rand_prod_last = random.randint(0, len(last_product_names) - 1)
    first_name = first_product_names[rand_prod_first]
    last_name = last_product_names[rand_prod_last]
    return(first_name + " " + last_name)

def build_date():
    """
    return a random date between given start and end dates.
    """
    start_date = datetime.date(2017, 1, 1)
    end_date = datetime.date(2023, 3, 31)
    time_range = end_date - start_date
    days_in_range = time_range.days

    rand_day = random.randrange(days_in_range)
    rand_date = start_date + datetime.timedelta(days=rand_day)
    return rand_date

def get_methodology():
    """
    return either Agile or Waterfall randomly
    """
    options = ["Agile", "Waterfall"]
    rand_option = random.randrange(0, 2)
    return(options[rand_option])

def build_product(id, name, owners_name, dev_list, sm_name, start_date, methodology):
    """
    Takes in the arguments we generate and returns a dict with fields populated
    """
    new_product = {
        "productId": id,
        "productName": name,
        "productOwnerName": owners_name,
        "Developers": dev_list,
        "scrumMasterName": sm_name,
        "startDate": start_date.strftime("%Y/%m/%d"),
        "methodology": methodology
    }
    return new_product

def build_product_list():
    """
    Returns a list of products 
    calls all the above functions to make fun random things happen
    """
    list_of_products = []
    num_products = random.randint(1, 40)
    for num in range(num_products):
        id = str(uuid.uuid1())
        name = build_product_name()
        owners_name = build_name()
        dev_list = build_dev_list()
        sm_name = build_name()
        start_date = build_date()
        methodology = get_methodology()

        product = build_product(id, name, owners_name, dev_list, sm_name, start_date, methodology)
        list_of_products.append(product)

    return list_of_products

def write_to_file(to_write):
    """
    open file and overwrite it with new product list
    """
    list_of_products = json.dumps(to_write)
    json_file = open(file_to_write_to, "w")
    json_file.write(list_of_products)
    json_file.close()


if __name__ == "__main__":
    """
    Serves as main as I didnt see a point in making a function
    that only calls two other functions... 
    """
    #heavy lifter. essentially do all the work. 
    list_of_products = build_product_list()
    #write the list to the json file
    write_to_file(list_of_products)
